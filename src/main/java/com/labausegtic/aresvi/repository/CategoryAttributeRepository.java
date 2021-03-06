package com.labausegtic.aresvi.repository;

import com.labausegtic.aresvi.domain.CategoryAttribute;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Set;


/**
 * Spring Data JPA repository for the CategoryAttribute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryAttributeRepository extends JpaRepository<CategoryAttribute, Long> {

    Set<CategoryAttribute> findAllByAuditTask_Id(Long auditTaskId);

}
