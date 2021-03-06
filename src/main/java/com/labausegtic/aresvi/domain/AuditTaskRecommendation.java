package com.labausegtic.aresvi.domain;


import org.joda.time.DateTime;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AuditTaskRecommendation.
 */
@Entity
@Table(name = "audit_task_recommendation")
public class AuditTaskRecommendation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "revised_date")
    private Instant revisedDate;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "standard_observation")
    private String standardObservation;

    @Column(name = "reviewed")
    private boolean reviewed;

    @ManyToOne
    private AuditProcessRecommendation auditProcessRecom;

    @ManyToOne
    private AuditTask auditTask;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public AuditTaskRecommendation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStandardObservation() {
        return standardObservation;
    }

    public AuditTaskRecommendation standardObservation(String standardObservation) {
        this.standardObservation = standardObservation;
        return this;
    }

    public void setStandardObservation(String standardObservation) {
        this.standardObservation = standardObservation;
    }

    public AuditProcessRecommendation getAuditProcessRecom() {
        return auditProcessRecom;
    }

    public AuditTaskRecommendation auditProcessRecom(AuditProcessRecommendation auditProcessRecommendation) {
        this.auditProcessRecom = auditProcessRecommendation;
        return this;
    }

    public void setAuditProcessRecom(AuditProcessRecommendation auditProcessRecommendation) {
        this.auditProcessRecom = auditProcessRecommendation;
    }

    public AuditTask getAuditTask() {
        return auditTask;
    }

    public AuditTaskRecommendation auditTask(AuditTask auditTask) {
        this.auditTask = auditTask;
        return this;
    }

    public boolean isReviewed() {
        return reviewed;
    }

    public void setReviewed(boolean reviewed) {
        this.reviewed = reviewed;
    }

    public void setAuditTask(AuditTask auditTask) {
        this.auditTask = auditTask;
    }

    public Instant getRevisedDate() {
        return revisedDate;
    }

    public void setRevisedDate(Instant revisedDate) {
        this.revisedDate = revisedDate;
    }

    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AuditTaskRecommendation auditTaskRecommendation = (AuditTaskRecommendation) o;
        if (auditTaskRecommendation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), auditTaskRecommendation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AuditTaskRecommendation{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
