package com.haesol.srmbackend.popup.service;


public interface PopupService {
    PopupDTO<?> getProgramMenuPopupList(ProgramPopupVO vo) throws ClassNotFoundException;
}
