import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import {JhiEventManager, JhiDataUtils, JhiAlertService} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { AuditTaskRecommendation } from './audit-task-recommendation.model';
import { AuditTaskRecommendationService } from './audit-task-recommendation.service';
import {Observable} from 'rxjs/Observable';
import {AttributeRecommendation} from '../attribute-recommendation/attribute-recommendation.model';
import {CategoryAttrRecommendation} from '../category-attr-recommendation/category-attr-recommendation.model';
import {AuditTaskStandardObservationService} from '../audit-task-standard-observation/audit-task-standard-observation.service';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {AuditTaskStandardObservation} from '../audit-task-standard-observation/audit-task-standard-observation.model';

@Component({
    selector: 'jhi-audit-task-recommendation-detail',
    templateUrl: './audit-task-recommendation-detail.component.html'
})
export class AuditTaskRecommendationDetailComponent implements OnInit, OnDestroy {

    auditTaskRecommendation: AuditTaskRecommendation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    isSaving: boolean;
    recommendationAttribute: string;
    recommendationCategoryAttr: string;

    auditTaskStandardObservations: AuditTaskStandardObservation[];

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private auditTaskRecommendationService: AuditTaskRecommendationService,
        private auditTaskStandardObservationService: AuditTaskStandardObservationService,
        private alertService: JhiAlertService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        this.auditTaskStandardObservations = [];
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.recommendationAttribute = '';
        this.recommendationCategoryAttr = '';
        this.registerChangeInAuditTaskRecommendations();
        this.loadAllAuditTaskStandardObservations();
    }

    load(id) {
        this.auditTaskRecommendationService.find(id).subscribe((auditTaskRecommendation) => {
            this.auditTaskRecommendation = auditTaskRecommendation;
        });
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(
            this.auditTaskRecommendationService.update(this.auditTaskRecommendation));
    }

    private subscribeToSaveResponse(result: Observable<AuditTaskRecommendation>) {
        result.subscribe((res: AuditTaskRecommendation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AuditTaskRecommendation) {
        this.eventManager.broadcast({ name: 'auditTaskRecommendationListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/audit-process-recommendation', this.auditTaskRecommendation.auditProcessRecomId]);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAuditTaskRecommendations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'auditTaskRecommendationListModification',
            (response) => this.load(this.auditTaskRecommendation.id)
        );
    }

    openModalAttribute(content, attrR: AttributeRecommendation) {

        this.recommendationAttribute = attrR.description;

        this.modalService.open(content).result.then(() => {
            attrR.description = this.recommendationAttribute;
            this.recommendationAttribute = '';
        }, (reason) => {
            this.recommendationAttribute = '';
        });
    }

    openModalCategoryAttr(content, catAttrR: CategoryAttrRecommendation) {

        this.recommendationCategoryAttr = catAttrR.description;

        this.modalService.open(content).result.then(() => {
            catAttrR.description = this.recommendationCategoryAttr;
            this.recommendationCategoryAttr = '';
        }, (reason) => {
            this.recommendationCategoryAttr = '';
        });
    }

    private loadAllAuditTaskStandardObservations() {

        this.auditTaskStandardObservationService.queryAll().subscribe(
            (res: ResponseWrapper) => this.onSuccessAuditTaskStandardObservations(res.json, res.headers),
            (res: ResponseWrapper) => this.onErrorAuditTaskStandardObservations(res.json)
        );

    }

    private onSuccessAuditTaskStandardObservations(data, headers) {
        this.auditTaskStandardObservations = data;
    }
    private onErrorAuditTaskStandardObservations(error) {
        this.alertService.error(error.message, null, null);
    }

}
