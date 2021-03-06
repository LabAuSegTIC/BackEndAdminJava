import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TraceabilityAuditComponent } from './traceability-audit.component';
import { TraceabilityAuditDetailComponent } from './traceability-audit-detail.component';
import { TraceabilityAuditPopupComponent } from './traceability-audit-dialog.component';
import { TraceabilityAuditDeletePopupComponent } from './traceability-audit-delete-dialog.component';
import {TraceabilityAuditStartAuditPopupComponent} from '../../flows/audit/not_started/traceability-audit-start-audit-dialog.component';
import {TraceabilityAuditFinishAuditPopupComponent} from './traceability-audit-finish-audit-dialog.component';

@Injectable()
export class TraceabilityAuditResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const traceabilityAuditRoute: Routes = [
    {
        path: 'traceability-audit',
        component: TraceabilityAuditComponent,
        resolve: {
            'pagingParams': TraceabilityAuditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMINISTRATOR', 'ROLE_ADMINISTRATIVE'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'traceability-audit/:id',
        component: TraceabilityAuditDetailComponent,
        data: {
            authorities: ['ROLE_ADMINISTRATIVE', 'ROLE_AUDITOR_EXTERNAL', 'ROLE_AUDITOR_INTERNAL'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const traceabilityAuditPopupRoute: Routes = [
    {
        path: 'traceability-audit-new',
        component: TraceabilityAuditPopupComponent,
        data: {
            authorities: ['ROLE_ADMINISTRATOR'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'traceability-audit/:id/edit',
        component: TraceabilityAuditPopupComponent,
        data: {
            authorities: ['ROLE_ADMINISTRATOR'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'traceability-audit/:id/delete',
        component: TraceabilityAuditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMINISTRATOR'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'traceability-audit/:id/start',
        component: TraceabilityAuditStartAuditPopupComponent,
        data: {
            authorities: ['ROLE_AUDITOR_EXTERNAL'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'traceability-audit/:id/finish',
        component: TraceabilityAuditFinishAuditPopupComponent,
        data: {
            authorities: ['ROLE_AUDITOR_EXTERNAL'],
            pageTitle: 'aresViApp.traceabilityAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
