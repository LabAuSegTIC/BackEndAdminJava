package com.labausegtic.aresvi.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CategoryAttribute entity.
 */
public class CategoryAttributeDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Long auditTaskId;

    private AuditTaskDTO auditTask;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAuditTaskId() {
        return auditTaskId;
    }

    public void setAuditTaskId(Long auditTaskId) {
        this.auditTaskId = auditTaskId;
    }

    public AuditTaskDTO getAuditTask() {
        return auditTask;
    }

    public void setAuditTask(AuditTaskDTO auditTask) {
        this.auditTask = auditTask;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CategoryAttributeDTO categoryAttributeDTO = (CategoryAttributeDTO) o;
        if(categoryAttributeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoryAttributeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoryAttributeDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
