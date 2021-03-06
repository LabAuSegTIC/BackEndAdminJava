import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Company } from '../../../entities/company/company.model';
import {CompanyAuditStartPopupService} from './company-popup.service';
import { CompanyService } from '../../../entities/company/company.service';

@Component({
    selector: 'jhi-company-dialog',
    templateUrl: './company-dialog.component.html'
})
export class CompanyDialogAuditStartComponent implements OnInit {

    company: Company;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private companyService: CompanyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(
                this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(
                this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<Company>) {
        result.subscribe((res: Company) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Company) {
        this.eventManager.broadcast({ name: 'companyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-company-popup',
    template: ''
})
export class CompanyAuditStartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyAuditStartPopupService: CompanyAuditStartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.companyAuditStartPopupService
                    .open(CompanyDialogAuditStartComponent as Component, params['id']);
            } else {
                this.companyAuditStartPopupService
                    .open(CompanyDialogAuditStartComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
