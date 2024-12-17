import React from 'react';

const OrangeMoneyForm = () => {
    return (

        <div class="card card-flush py-4 mb-10">
            <div class="card-body bgi-no-repeat bgi-position-center bgi-size-cover card-rounded ">
                <div data-kt-stepper-element="content" className="current">
                    {/* Wrapper */}
                    <div className="w-100">
                        <div className="pb-12">
                            <h1 className="fw-bold text-gray-900">Paiement par Orange money</h1>
                            <div className="text-muted fw-semibold fs-4">
                                If you need more info, please check{' '}
                                <a href="#" className="link-primary">
                                    Project Guidelines
                                </a>
                            </div>
                        </div>

                        <div class="notice bg-light-success rounded border-success border border-dashed mb-9 p-6 ">
                            
                            <div class="d-flex flex-column fv-row fv-plugins-icon-container">
                                <label class="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span class="required">Numero de téléphone</span>

                                    
                                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Specify a target name for future usage and reference" data-bs-original-title="Specify a target name for future usage and reference" data-kt-initialized="1">
                                <i class="ki-duotone ki-information-5 text-gray-500 fs-6"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i></span>                        </label>

                                <input type="text" class="form-control form-control-solid bg-gray-500" placeholder="Enter Target Title" name="target_title"/>
                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-md-4 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Nom</label>
                                <div className="position-relative d-flex align-items-center">
                                <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>                                {/*end::Icon*/}
                                <input className="form-control form-control-solid ps-12 flatpickr-input" placeholder="Select a date" name="due_date" type="text" readOnly="readonly" />
                                </div>
                            </div>

                            <div className="col-md-4 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Prénom</label>
                                <div className="position-relative d-flex align-items-center">
                                <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>                                {/*end::Icon*/}
                                <input className="form-control form-control-solid ps-12 flatpickr-input" placeholder="Select a date" name="due_date" type="text" readOnly="readonly" />
                                </div>
                            </div>

                            <div className="col-md-4 fv-row">
                                <label className="required fs-6 fw-semibold mb-2">Email</label>
                                <div className="position-relative d-flex align-items-center">
                                <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>                                {/*end::Icon*/}
                                <input className="form-control form-control-solid ps-12 flatpickr-input" placeholder="Select a date" name="due_date" type="text" readOnly="readonly" />
                                </div>
                            </div>

                        </div>

                        <div className='row mt-4'>
                            <div className="col-lg-12 fv-row">
                            <div className="btn btn-success  rounded fs-14 pull-right" >Effectuer le Paiement</div>

                            </div>
                        </div>

                        <div className="form-group">
                            {/* onClick={handlePaymentClick} */}
                </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default OrangeMoneyForm;
