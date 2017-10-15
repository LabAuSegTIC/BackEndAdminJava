package com.labausegtic.aresvi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TraceabilityAudit.
 */
@Entity
@NamedNativeQuery(name = "traceability_audit.findLastByCompanyId",
    query="SELECT * FROM traceability_audit t where t.company_id = :company_id order by t.creation_date DESC Limit 1;",
    resultClass = TraceabilityAudit.class
)
@Table(name = "traceability_audit")
public class TraceabilityAudit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "creation_date")
    private Instant creationDate;

    @OneToMany(mappedBy = "traceabilityAudit")
    @JsonIgnore
    private Set<AuditProcess> auditProcesses = new HashSet<>();

    @ManyToOne
    private Company company;

    @ManyToOne
    private CompanyContactPerson companyContactPerson;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TraceabilityAudit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public TraceabilityAudit category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public TraceabilityAudit creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Set<AuditProcess> getAuditProcesses() {
        return auditProcesses;
    }

    public TraceabilityAudit auditProcesses(Set<AuditProcess> auditProcesses) {
        this.auditProcesses = auditProcesses;
        return this;
    }

    public TraceabilityAudit addAuditProcesses(AuditProcess auditProcess) {
        this.auditProcesses.add(auditProcess);
        auditProcess.setTraceabilityAudit(this);
        return this;
    }

    public TraceabilityAudit removeAuditProcesses(AuditProcess auditProcess) {
        this.auditProcesses.remove(auditProcess);
        auditProcess.setTraceabilityAudit(null);
        return this;
    }

    public void setAuditProcesses(Set<AuditProcess> auditProcesses) {
        this.auditProcesses = auditProcesses;
    }

    public Company getCompany() {
        return company;
    }

    public TraceabilityAudit company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public CompanyContactPerson getCompanyContactPerson() {
        return companyContactPerson;
    }

    public void setCompanyContactPerson(CompanyContactPerson companyContactPerson) {
        this.companyContactPerson = companyContactPerson;
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
        TraceabilityAudit traceabilityAudit = (TraceabilityAudit) o;
        if (traceabilityAudit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), traceabilityAudit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TraceabilityAudit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}