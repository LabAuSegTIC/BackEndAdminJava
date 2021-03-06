package com.labausegtic.aresvi.service;

import com.labausegtic.aresvi.service.dto.ReportDTO;
import java.util.List;

/**
 * Service Interface for managing Report.
 */
public interface ReportService {

    /**
     * Save a report.
     *
     * @param reportDTO the entity to save
     * @return the persisted entity
     */
    ReportDTO save(ReportDTO reportDTO);

    /**
     *  Get all the reports.
     *
     *  @return the list of entities
     */
    List<ReportDTO> findAll();

    /**
     *  Get the "id" report.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ReportDTO findOne(Long id);

    /**
     *  Delete the "id" report.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
