import React, { useState } from 'react';

const RecuperationTicket = () => {
    const [selectedGetitcketOption, setSelectedGetitcketOption] = useState(1);
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [confirmWhatsappNumber, setConfirmWhatsappNumber] = useState('');

    const handleOptionGetitcketChange = (e) => {
        setSelectedGetitcketOption(parseInt(e.target.value));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telephone') {
            setTelephone(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'whatsappNumber') {
            setWhatsappNumber(value);
        } else if (name === 'confirmWhatsappNumber') {
            setConfirmWhatsappNumber(value);
        }
    };

    const shouldShowConfirmation = () => {
        if (selectedGetitcketOption === 1 && telephone !== '') {
            return true; // Afficher si le numéro de téléphone est renseigné
        } else if (selectedGetitcketOption === 2 && whatsappNumber !== '' && whatsappNumber === confirmWhatsappNumber) {
            return true; // Afficher si les numéros WhatsApp sont identiques
        }
        return false;
    };

    return (
        <div className="card card-flush py-4 mb-10">
            <div className="card-body bgi-no-repeat bgi-position-center bgi-size-cover card-rounded">
                <div data-kt-stepper-element="content" className="current">
                    {/* Wrapper */}
                    <div className="w-100">
                        <div className="pb-12">
                            <h1 className="fw-bold text-gray-900 text-theme">Obtenir mon ticket</h1>
                            <div className="text-muted fw-semibold fs-4 text-theme">
                                Comment voulez-vous recevoir votre ticket ?
                            </div>
                        </div>

                        <div className=" bgi-no-repeat bgi-position-center bgi-size-cover card-rounded w-100">
                            <div className="row mb-10">
                                <div className="col-xl-3 col-lg-6 d-flex flex-column h-100">
                                    <label className={`btn btn-outline btn-outline-dashed d-flex text-start p-6 ${selectedGetitcketOption === 1 ? 'btn-active-light-primary active' : ''}`} data-kt-button="true">
                                        <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                            <input className="form-check-input" type="radio" name="ticket_option" value={1} checked={selectedGetitcketOption === 1} onChange={handleOptionGetitcketChange} />
                                        </span>
                                        <span className="ms-10">
                                            <span className="fs-4 fw-bold text-gray-800 d-block text-theme">Téléphone</span>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-xl-3 col-lg-6 d-flex flex-column">
                                    <label className={`btn btn-outline btn-outline-dashed d-flex text-start p-6 ${selectedGetitcketOption === 2 ? 'btn-active-light-primary active' : ''}`} data-kt-button="true">
                                        <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                            <input className="form-check-input" type="radio" name="ticket_option" value={2} checked={selectedGetitcketOption === 2} onChange={handleOptionGetitcketChange} />
                                        </span>
                                        <span className="ms-10">
                                            <span className="fs-4 fw-bold text-gray-800 d-block text-theme">Whatsapp</span>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {selectedGetitcketOption === 1 && (
                                <div className='row' id="telephone">
                                    <div className="col-md-6 fv-row">
                                        <label className="required fs-6 fw-semibold mb-2 text-theme">Téléphone</label>
                                        <div className="position-relative d-flex align-items-center">
                                            <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4 text-theme"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>
                                            <input className="form-control form-control-solid ps-12" placeholder="Renseigner votre numero de téléphone" name="telephone" type="tel" value={telephone} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 fv-row">
                                        <label className="required fs-6 fw-semibold mb-2 text-theme">Email</label>
                                        <div className="position-relative d-flex align-items-center">
                                            <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>
                                            <input className="form-control form-control-solid ps-12" placeholder="Renseigner votre email " name="email" type="email" value={email} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedGetitcketOption === 2 && (
                                <div className='row' id="whatsapp">
                                    <div className="col-md-6 fv-row">
                                        <label className="required fs-6 fw-semibold mb-2 text-theme">Numero whatsapp</label>
                                        <div className="position-relative d-flex align-items-center">
                                            <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>
                                            <input className="form-control form-control-solid ps-12" placeholder="Enter your WhatsApp number" name="whatsappNumber" type="tel" value={whatsappNumber} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 fv-row">
                                        <label className="required fs-6 fw-semibold mb-2 text-theme">Confirmé le numero</label>
                                        <div className="position-relative d-flex align-items-center">
                                            <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>
                                            <input className="form-control form-control-solid ps-12" placeholder="Confirm your WhatsApp number" name="confirmWhatsappNumber" type="tel" value={confirmWhatsappNumber} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {shouldShowConfirmation() && (
                                <div className="mt-3">
                                    <div className="alert alert-success" role="alert">
                                        Vos informations sont confirmées.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecuperationTicket;
