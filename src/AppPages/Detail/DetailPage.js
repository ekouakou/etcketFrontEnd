import React, { useState, useEffect, useContext } from 'react';
import TicketOrder from './TicketOrder';
import AppHeader from '../../AppComponents/Header/AppHeader'
// import Footer from '../components/Footer';
import { fetchEvenements, crudData } from '../../services/apiService';
import SeatMap from './SeatMap';
import Swal from 'sweetalert2';
import { CartContext } from '../../contexts/CartContext';
import DetailHeader from './DetailHeader';
import OrangeMoneyForm from './OrangeMoneyForm';
import RecuperationTicket from './RecuperationTicket';
import Switch from 'react-switch';
import Reservations from './Reservations';
import { CounterContext } from '../../contexts/CounterContext'; // Assure-toi du chemin correct
import './accueil.css';
import Footer from '../../AppComponents/Footer/Footer';
import { Modal, Button } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeProvider';
import { Helmet } from "react-helmet";


const urlBaseImage = localStorage.getItem("urlBaseImage"); // La base de l'url des images
const mode = JSON.parse(localStorage.getItem("appMode"));
const STR_EVESTATUTFREE = localStorage.getItem('STR_EVESTATUTFREE');

const paymentOptions = [
    { id: 1, type: 'mobile-money', name: 'Orange Money', image: 'assets/images/payment/om.png', STR_CURRENCY: 'GNF', STR_PROVIDER: "orangemoney" },
    { id: 2, type: 'mobile-money', name: 'Mtn Money', image: 'assets/images/payment/logo-mtn.png', STR_CURRENCY: 'GNF', STR_PROVIDER: "mtnmoney" },
];


function Detail() {
    const [eventDetails, setEventDetails] = useState(null);
    const [tokenNotification, setTokenNotification] = useState(null);
    const [paymentProvider, setPaymentProvider] = useState(null); // Nouvel état pour le fournisseur de paiement
    const { cartItems, clearCart } = useContext(CartContext);
    const [showGetTicket, setShowGetTicket] = useState(false); // State to control visibility of "Obtenir mon ticket"
    const [ticketFieldsFilled, setTicketFieldsFilled] = useState(false); // State to track if ticket fields are filled
    const [loading, setLoading] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const { count } = useContext(CounterContext);
    const [freeTicketNumber, setFreeTicketNumber] = useState();
    const [selectedOption, setSelectedOption] = useState(paymentOptions[0].id);
    const [paymentStarted, setPaymentSarted] = useState(false);
    const [conditionsAccepted, setConditionsAccepted] = useState(false);



    useEffect(() => {
        console.log("loading statut ----->", loading);
        setConditionsAccepted(false)
    }, [loading]);



    if (paymentCompleted === true) {
        setLoading(false);
        setPaymentCompleted(true)
    }



    useEffect(() => {
        if (count > 0) {
            setShowGetTicket(true);
        } else {
            setShowGetTicket(false);
        }
    }, [count]);


    useEffect(() => {
        const params = {
            mode: mode.getEvenementMode,
            LG_EVEID: localStorage.getItem('LG_EVEID')
        };
        fetchEvenements(params)
            .then(response => {
                setEventDetails(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            });
    }, []);

    useEffect(() => {
        // Check if cart is not empty to show "Obtenir mon ticket"
        // 

        // if(STR_EVESTATUTFREE !='0'){ }
        if (cartItems.length > 0) {
            setShowGetTicket(true);
        } else {
            setShowGetTicket(false);
        }


    }, [cartItems]);


    const handleOptionClick = (optionId) => {
        setSelectedOption(optionId);
    };


    const [selectedGetitcketOption, setSelectedGetitcketOption] = useState(1);
    const [telephone, setTelephone] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [quantiteTicketGratuit, setQuantiteTicketGratuit] = useState('');
    const [emailPaiement, setEmailPaiement] = useState('');
    const [email, setEmail] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [confirmWhatsappNumber, setConfirmWhatsappNumber] = useState('');

    const [mtnPhonePayment, setMtnPhonePayment] = useState('');
    const [orangePhonePayment, setOrangePhonePayment] = useState('');

    const handleOptionGetitcketChange = (e) => {
        setSelectedGetitcketOption(parseInt(e.target.value));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'STR_TICPHONE') {
            setTelephone(value);
            setMtnPhonePayment(value); // Mise à jour du champ MTN
        } else if (name === 'STR_TICMAIL') {
            setEmail(value);
            setEmailPaiement(value); // Mise à jour de l'email dans le paiement
        } else if (name === 'STR_FIRSTNAME') {
            setNom(value);
        } else if (name === 'STR_LASTNAME') {
            setPrenom(value);
        } else if (name === 'STR_TICMAILPAIEMENT') {
            setEmailPaiement(value);
        } else if (name === 'whatsappNumber') {
            setWhatsappNumber(value);
        } else if (name === 'confirmWhatsappNumber') {
            setConfirmWhatsappNumber(value);
        } else if (name === 'STR_TICPHONEPAYMENT_MTN') {
            setMtnPhonePayment(value);
        } else if (name === 'STR_TICPHONEPAYMENT_ORANGE') {
            setOrangePhonePayment(value);
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

    // À l'intérieur de votre composant

    // Fonction pour gérer le changement de la case à cocher

    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);


    const handlePayment = async () => {

        if (!conditionsAccepted) {
            //alert('Veuillez accepter les conditions avant de procéder au paiement.');
            return;
        }
        const selectedPaymentOption = paymentOptions.find(option => option.id === selectedOption);

        // if(STR_EVESTATUTFREE !='0'){


        //  }else{

        //  }

        const params = {
            mode: mode.createTicketMode,
            STR_TICMAIL: email,
            STR_CURRENCY: selectedPaymentOption.STR_CURRENCY,
            STR_TICPHONE: selectedOption === 1 ? telephone : mtnPhonePayment, //telephone,
            STR_PROVIDER: selectedPaymentOption.STR_PROVIDER,
            STR_TICPHONEPAYMENT: selectedOption === 1 ? orangePhonePayment : mtnPhonePayment,
            LG_EVEGLOBALID: quantiteTicketGratuit != 0 ? [{ LG_EVEID: eventDetails.LG_EVEID, STR_TICMAIL: email, LG_LSTID: eventDetails.LG_LSTID, STR_EVENAME: eventDetails.STR_EVENAME, STR_EVEPIC_PANIER: eventDetails.STR_EVEPIC_PANIER, DT_EVEBEGIN: eventDetails.DT_EVEBEGIN, category: eventDetails.STR_EVENAME, INT_ELINUMBER: quantiteTicketGratuit, mode: mode.createTicketMode }] : localStorage.getItem('cartItems'),
        };


        if (quantiteTicketGratuit != 0 || localStorage.getItem('cartItems') != "") {

            setLoading(true);

            try {
                const response = await crudData(params, "TicketManager.php");
                if (response.status === 200) {
                    const data = response.data;
                    if (data.code_statut === "1") {
                        setTokenNotification(data.token_notification);
                        setPaymentProvider(selectedPaymentOption.STR_PROVIDER); // Stockez le fournisseur de paiement
                        // Ouvrir un nouvel onglet avec payment_url
                        if (selectedOption === 1) {
                            window.open(data.payment_url, '_blank');
                        }

                        // Démarrer la vérification de paiement avec setInterval
                        const intervalId = setInterval(async () => {
                            const verifyParams = {
                                mode: mode.verifypaymentMode,
                                STR_PROVIDER: selectedPaymentOption.STR_PROVIDER,
                                LG_CTRID: data.token_notification,
                            };

                            try {
                                const verifyResponse = await crudData(verifyParams, "CashManager.php");
                                if (verifyResponse.status === 200) {
                                    const verifyData = verifyResponse.data;
                                    if (verifyData.code_statut === "2") {
                                        setLoading(true);
                                    } else if (verifyData.code_statut === "1") {
                                        clearInterval(intervalId);
                                        localStorage.removeItem('cartItems');
                                        clearCart();
                                        setLoading(false);
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Statut du paiement',
                                            text: verifyData.desc_statut,
                                            confirmButtonText: 'OK'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.location.href = '/';
                                            }
                                        });
                                    } else {
                                        clearInterval(intervalId);
                                        setLoading(false);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Statut du paiement',
                                            text: verifyData.desc_statut,
                                        });
                                    }
                                } else {
                                    console.error('Erreur:', verifyResponse.data);
                                }
                            } catch (error) {
                                console.error('Erreur lors de la requête:', error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Erreur lors de la requête',
                                    text: 'Une erreur est survenue lors de la requête.',
                                });
                            }
                        }, 10000); // Vérifie le paiement toutes les 10 secondes
                    } else {
                        console.error('Erreur de paiement:', data);
                    }
                } else {
                    console.error('Erreur de paiement:', response.data);
                }
            } catch (error) {
                // Gérer les erreurs de requête
                console.error('Erreur lors de la requête de paiement:', error);
                //alert('Erreur lors de la requête de paiement');
                Swal.fire({
                    icon: 'error',
                    title: 'Statut paiement',
                    text: 'Erreur lors de la requête de paiement',
                });
            }

        }


    };


    const [isFormValid, setIsFormValid] = useState(false);

    // Fonction pour valider un email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Vérifier les champs et l'email à chaque changement
    useEffect(() => {

        if (telephone.trim() && mtnPhonePayment.trim() && nom.trim() && prenom.trim() && validateEmail(emailPaiement)) {
            setIsFormValid(true);  // Tous les champs sont remplis et l'email est valide
        } else {
            setIsFormValid(false);  // Un ou plusieurs champs sont vides ou l'email est invalide
            setConditionsAccepted(false); // Décoche la case si les champs ne sont pas valides
        }
    }, [telephone, nom, prenom, emailPaiement]);

    // Gestion de la case à cocher
    const handleConditionsChange = (e) => {
        if (isFormValid) {
            setConditionsAccepted(e.target.checked);
        }
    };


    const handleQuantityUpdate = (totalQuantities) => {
        console.log("Quantité totale des tickets:", totalQuantities);
        setQuantiteTicketGratuit(totalQuantities);
        // Vous pouvez gérer la quantité totale ici (par exemple, mettre à jour un état)
    };

    const handleCancelCommande = () => {
        clearCart();
        localStorage.removeItem('cartItems');
        // Vous pouvez gérer la quantité totale ici (par exemple, mettre à jour un état)
    };



    const [datePassed, setDatePassed] = useState(false);
    const handleDatePassedUpdate = (isPassed) => {
        setDatePassed(isPassed);
    };

    // État pour gérer la visibilité du modal des conditions de vente
    const [isConditionsVisible, setIsConditionsVisible] = useState(false);

    // Fonction pour ouvrir/fermer le modal des conditions de vente
    const toggleConditionsModal = () => {
        setIsConditionsVisible(!isConditionsVisible);
    };

    const ConditionsModal = (
        <Modal
            size="xl"
            show={isConditionsVisible}
            onHide={toggleConditionsModal}
            animation={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-theme'>Conditions de Vente</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-scroll">
                <div className="container">
                    <h2 className="text-theme text-center mb-10">Conditions Générales d'Utilisation et de Vente de Guinée Ticket</h2>
                    {/* <p className="text-center">Dernière mise à jour le : [Date de la dernière mise à jour]</p> */}
                    <p className="text-theme">
                        Les présentes Conditions Générales d’Utilisation et de Vente (ci-après « CGU ») régissent l’utilisation du site internet www.guineeticket.com (ci-après le « Site ») et la vente de billets pour des événements (ci-après les « Billets ») par AFRIDIGICOM SARLU (ci-après « Guinée Ticket »), agence de marketing et de communication enregistrée en Guinée, pour le compte d’organisateurs d’événements (ci-après les « Organisateurs »).
                    </p>
                    <p className="text-theme">
                        En accédant au Site et/ou en utilisant les services de Guinée Ticket, tout utilisateur (ci-après l’ « Utilisateur ») accepte sans réserve les présentes CGU. Il est donc conseillé de lire attentivement les présentes CGU avant toute utilisation du Site ou achat de Billets.
                    </p>

                    <h3 className="text-theme">Article 1 - Définitions</h3>
                    <ul>
                        <li className="text-theme"><strong>Site :</strong> désigne le site internet accessible à l’adresse www.guineeticket.com.</li>
                        <li className="text-theme"><strong>Guinée Ticket :</strong> désigne la société AFRIDIGICOM SARLU, agence de marketing et de communication, propriétaire et gestionnaire du Site.</li>
                        <li className="text-theme"><strong>Organisateur :</strong> désigne toute personne physique ou morale qui utilise les services de Guinée Ticket pour la vente de Billets pour un événement qu'elle organise.</li>
                        <li className="text-theme"><strong>Utilisateur :</strong> désigne toute personne physique ou morale qui accède au Site et/ou utilise les services de Guinée Ticket.</li>
                        <li className="text-theme"><strong>Billet :</strong> désigne un titre d'accès à un événement vendu par Guinée Ticket pour le compte d'un Organisateur.</li>
                        <li className="text-theme"><strong>Evénement :</strong> désigne tout spectacle, concert, festival, manifestation sportive ou culturelle, ou tout autre événement pour lequel Guinée Ticket propose la vente de Billets.</li>
                        <li className="text-theme"><strong>Services :</strong> désigne l'ensemble des services proposés par Guinée Ticket via le Site, notamment la vente de Billets, la gestion des commandes et le service client.</li>
                    </ul>

                    <h3 className="text-theme">Article 2 - Objet</h3>
                    <p className="text-theme">
                        Les présentes CGU ont pour objet de définir les conditions dans lesquelles Guinée Ticket met à disposition des Utilisateurs son Site et ses Services pour l'achat de Billets pour des Evénements.
                        Guinée Ticket agit en qualité d'intermédiaire entre l'Organisateur et l'Utilisateur. La responsabilité de l'organisation de l'Evénement et de son bon déroulement incombe exclusivement à l'Organisateur.
                    </p>

                    <h3 className="text-theme">Article 3 - Accès et utilisation du Site</h3>
                    <p className="text-theme">
                        L’accès au Site est libre et gratuit à tout Utilisateur disposant d’un accès à internet. Tous les coûts afférents à l’accès au Site, que ce soient les frais matériels, logiciels ou d’accès à internet sont exclusivement à la charge de l’Utilisateur.
                    </p>
                    <p className="text-theme">
                        Guinée Ticket s'efforce de maintenir le Site accessible 24 heures sur 24, 7 jours sur 7, mais n'est tenue à aucune obligation d'y parvenir. Ainsi, Guinée Ticket peut interrompre l'accès au Site, notamment pour des raisons de maintenance, de mise à jour ou pour toute autre raison.
                    </p>

                    <h3 className="text-theme">Article 4 - Création d'un compte</h3>
                    <p className="text-theme">
                        L'achat de Billets sur le Site n'est pas nécessairement soumis à la création d'un compte utilisateur. Cependant, la création d'un compte permet à l'Utilisateur de bénéficier de fonctionnalités supplémentaires, telles que la sauvegarde de ses informations personnelles pour faciliter ses futurs achats.
                    </p>

                    <h3 className="text-theme">Article 5 - Commande et achat de Billets</h3>
                    <h4>5.1 Processus de commande</h4>
                    <ul>
                        <li className="text-theme">Sélectionner l'Evénement de son choix sur le Site.</li>
                        <li className="text-theme">Sélectionner le type de Billet souhaité et le nombre de Billets.</li>
                        <li className="text-theme">Remplir le formulaire de commande avec ses informations personnelles et ses coordonnées bancaires.</li>
                        <li className="text-theme">Vérifier et valider sa commande.</li>
                        <li className="text-theme">Procéder au paiement en ligne.</li>
                    </ul>

                    <h4>5.2 Confirmation de la commande</h4>
                    <p className="text-theme">
                        Une fois le paiement validé, l'Utilisateur reçoit une confirmation de commande par email à l'adresse email indiquée lors de la commande.
                    </p>

                    <h4>5.3 Obtention des Billets</h4>
                    <p className="text-theme">
                        Les Billets sont envoyés à l'Utilisateur par email, sous format électronique (e-billet).
                    </p>

                    <h4>5.4 Prix des Billets</h4>
                    <p className="text-theme">
                        Les prix des Billets sont indiqués en Francs Guinéens (GNF) et sont toutes taxes comprises (TTC). Les frais de service et de livraison éventuels sont indiqués à l'Utilisateur avant la validation de la commande.
                    </p>

                    <h4>5.5 Disponibilité des Billets</h4>
                    <p className="text-theme">
                        Les Billets sont proposés à la vente dans la limite des places disponibles. Guinée Ticket ne saurait être tenue responsable de l'indisponibilité de Billets pour un Evénement donné.
                    </p>

                    <h3 className="text-theme">Article 6 - Paiement</h3>
                    <p className="text-theme">
                        Le paiement des Billets s'effectue en ligne, par carte bancaire ou via un service de paiement mobile (Orange Money, MTN Mobile Money).
                    </p>

                    <h3 className="text-theme">Article 7 - Annulation, modification et remboursement</h3>
                    <h4>7.1 Annulation et modification par l'Utilisateur</h4>
                    <p className="text-theme">
                        Sauf mention contraire, les Billets ne sont ni échangeables ni remboursables.
                    </p>

                    <h4>7.2 Annulation et modification par l'Organisateur</h4>
                    <p className="text-theme">
                        En cas d'annulation ou de modification d'un Evénement par l'Organisateur, Guinée Ticket informera l'Utilisateur dans les meilleurs délais par email.
                    </p>

                    <h3 className="text-theme">Article 8 - Responsabilités</h3>
                    <p className="text-theme">
                        Guinée Ticket agit en qualité d'intermédiaire entre l'Organisateur et l'Utilisateur.
                    </p>

                    <h3 className="text-theme">Article 9 - Propriété intellectuelle</h3>
                    <p className="text-theme">
                        Le Site et son contenu sont la propriété exclusive de Guinée Ticket et sont protégés par les lois sur la propriété intellectuelle.
                    </p>

                    <h3 className="text-theme">Article 10 - Données personnelles</h3>
                    <p className="text-theme">
                        Guinée Ticket s'engage à respecter la confidentialité des données personnelles des Utilisateurs collectées.
                    </p>

                    <h3 className="text-theme">Article 11 - Service client</h3>
                    <p className="text-theme">
                        L'Utilisateur peut contacter Guinée Ticket pour toute question ou réclamation.
                    </p>

                    <h3 className="text-theme">Article 12 - Droit applicable et litiges</h3>
                    <p className="text-theme">
                        Les présentes CGU sont soumises au droit guinéen. Tout litige relatif à l'interprétation ou à l'exécution des présentes CGU sera de la compétence exclusive des tribunaux compétents de Conakry, Guinée.
                    </p>

                    <h3 className="text-theme">Article 13 - Modification des CGU</h3>
                    <p className="text-theme">
                        Guinée Ticket se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront applicables dès leur mise en ligne sur le Site. L'Utilisateur est donc invité à consulter régulièrement la dernière version des CGU en vigueur.
                    </p>

                    <h3 className="text-theme">Article 14 - Dispositions générales</h3>
                    <p className="text-theme">
                        Si une ou plusieurs stipulations des présentes CGU sont tenues pour non valides ou déclarées comme telles en application d'une loi, d'un règlement ou à la suite d'une décision définitive d'une juridiction compétente, les autres stipulations garderont toute leur force et leur portée.
                    </p>
                    <p className="text-theme">
                        Le fait pour Guinée Ticket de ne pas se prévaloir d'un manquement par l'Utilisateur à l'une quelconque des obligations visées dans les présentes CGU ne saurait s'interpréter comme une renonciation de sa part à se prévaloir dans l'avenir d'un manquement par l'Utilisateur auxdites obligations.
                    </p>

                    <h3 className="text-theme">Article 15 - Entrée en vigueur</h3>
                    <p className="text-theme">
                        Les présentes CGU entrent en vigueur à compter de leur mise en ligne sur le Site.
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='text-theme' onClick={toggleConditionsModal}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );



    return (
        <>



            <AppHeader />

            {eventDetails && (
                <section key={eventDetails.LG_EVEID} className="section section--details" style={{ marginTop: '30px' }}>

                    <Helmet>
                        <meta property="og:title" content={eventDetails.LG_EVEID} />
                        <meta property="og:description" content={eventDetails.LG_EVEID} />
                        <meta property="og:image" content={urlBaseImage + eventDetails.STR_EVEPIC} />
                        <meta property="og:url" content={eventDetails.LG_EVEID} />
                        <meta property="og:type" content="website" />
                    </Helmet>

                    {/* details content */}

                    <DetailHeader
                        evenement={eventDetails}
                        first_btn={{ link: "/", name: "Retour à la recherche" }}
                        second_btn={{ link: "/paiement", name: "Retour au paiement" }}
                        cartItems={cartItems}
                        onDatePassedUpdate={handleDatePassedUpdate} // Passer la fonction en tant que prop

                    />
                    <div className="container">
                        <div className="movie-details-section padding-top padding-bottom mt-5 pt-5">
                            <div className="container">
                                <div className="row">
                                    <div className={` ${!datePassed ? 'col-lg-9' : 'col-lg-9'}`}>

                                        {/* {eventDetails.STR_EVEDISPLAYROOM === "1" && <SeatMap />} */}
                                        <TicketOrder eventDetails={eventDetails} onQuantityUpdate={handleQuantityUpdate} datePassed={datePassed} />
                                        {((showGetTicket && !datePassed) || quantiteTicketGratuit > 0) && (
                                            <>
                                                {/* <RecuperationTicket /> */}

                                                <div className="card card-flush py-4 mb-10">
                                                    <div className="card-body bgi-no-repeat bgi-position-center bgi-size-cover card-rounded">
                                                        <div data-kt-stepper-element="content" className="current">
                                                            {/* Wrapper */}
                                                            <div className="w-100">
                                                                <div className="pb-12">
                                                                    <h1 className="fw-bold text-gray-900 text-theme">Obtenir mon ticket</h1>
                                                                    <div className="text-muted fw-semibold fs-4 text-theme">
                                                                        Comment voulez vous recevoir votre Ticket ?
                                                                    </div>
                                                                </div>

                                                                <div className=" bgi-no-repeat bgi-position-center bgi-size-cover card-rounded w-100">
                                                                    <div className="row mb-10">
                                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-xs-12 col-12 d-flex flex-column h-100 mb-4">
                                                                            <label className={`btn btn-outline btn-outline-dashed d-flex text-start p-6 ${selectedGetitcketOption === 1 ? 'btn-active-light-primary active' : ''}`} data-kt-button="true">
                                                                                <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                                                    <input className="form-check-input" type="radio" name="ticket_option" value={1} checked={selectedGetitcketOption === 1} onChange={handleOptionGetitcketChange} />
                                                                                </span>
                                                                                <span className="ms-10">
                                                                                    <span className="fs-4 fw-bold text-gray-800 d-block text-theme"> <img className='' width={20} src='assets/media/chatting.png' /> Sms </span>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-xs-12 col-12 d-flex flex-column mb-4">
                                                                            <label className={`btn btn-outline btn-outline-dashed d-flex text-start p-6 ${selectedGetitcketOption === 2 ? 'btn-active-light-primary active' : ' '}`} data-kt-button="true">
                                                                                <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                                                    <input className="form-check-input" type="radio" name="ticket_option" value={2} checked={selectedGetitcketOption === 2} onChange={handleOptionGetitcketChange} />
                                                                                </span>
                                                                                <span className="ms-10">
                                                                                    <span className="fs-4 fw-bold text-gray-800 d-block text-theme"> <img className='' width={20} src='assets/media/whatsapp.png' /> Whatsapp </span>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                        <div className="col-xl-3 col-lg-4 col-md-4 col-xs-12 col-12 d-flex flex-column mb-4">
                                                                            <label className={`btn btn-outline btn-outline-dashed d-flex text-start p-6 ${selectedGetitcketOption === 3 ? 'btn-active-light-primary active' : ' '}`} data-kt-button="true">
                                                                                <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                                                                    <input className="form-check-input" type="radio" name="ticket_option" value={3} checked={selectedGetitcketOption === 3} onChange={handleOptionGetitcketChange} />
                                                                                </span>
                                                                                <span className="ms-10">
                                                                                    <span className="fs-4 fw-bold text-gray-800 d-block text-theme"> <img className='' width={20} src='assets/media/enveloppe.png' /> Email </span>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    {selectedGetitcketOption === 1 && (
                                                                        <div className='row' id="telephone">
                                                                            <div className="col-md-12 fv-row">
                                                                                <label className="required fs-6 fw-semibold mb-2 text-theme">Téléphone</label>
                                                                                <div className="position-relative d-flex align-items-center">
                                                                                    <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4 text-theme"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>
                                                                                    <input className="form-control form-control-solid ps-12" placeholder="Entrez votre numéro de téléphone" name="STR_TICPHONE" type="tel" value={telephone} onChange={handleInputChange} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {selectedGetitcketOption === 2 && (
                                                                        <div className='row' id="whatsapp">
                                                                            <div className="col-md-6 fv-row">
                                                                                <label className=" fs-6 fw-semibold mb-2 text-theme">Numero whatsapp</label>
                                                                                <div className="position-relative d-flex align-items-center">
                                                                                    <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /><span className="path5" /><span className="path6" /></i>
                                                                                    <input className="form-control form-control-solid ps-12" placeholder="Entrez votre numéro de téléphone WhatsApp" name="whatsappNumber" type="tel" value={whatsappNumber} onChange={handleInputChange} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 fv-row">
                                                                                <label className=" fs-6 fw-semibold mb-2 text-theme">Confirmé le numero</label>
                                                                                <div className="position-relative d-flex align-items-center">
                                                                                    <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4"> </i>
                                                                                    <input className="form-control form-control-solid ps-12" placeholder="Confirmez votre numéro de téléphone WhatsApp" name="confirmWhatsappNumber" type="tel" value={confirmWhatsappNumber} onChange={handleInputChange} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {selectedGetitcketOption === 3 && (
                                                                        <div className='row' id="email">
                                                                            <div className="col-md-12 fv-row">
                                                                                <label className=" fs-6 fw-semibold mb-2 text-theme">Email</label>
                                                                                <div className="position-relative d-flex align-items-center">
                                                                                    <input className="form-control form-control-solid ps-12" placeholder="Entrez votre email " name="STR_TICMAIL" type="email" value={email} onChange={handleInputChange} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div class="fs-7 fw-semibold text-muted mt-5">Champ obligatoire <span className='required'></span></div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* {shouldShowConfirmation() && ()} */}

                                                <div className="card card-flush py-4 mb-10">
                                                    <div className="card-body bgi-no-repeat bgi-position-center bgi-size-cover card-rounded">
                                                        <div data-kt-stepper-element="content" className="current">
                                                            <div className="w-100">
                                                                <div className="pb-12">
                                                                    <h1 className="fw-bold text-gray-900 text-theme">{eventDetails.STR_EVESTATUTFREE === "0" ? "Vos informations personnelles" : "Payer mon ticket"}</h1>
                                                                    <div className="text-muted fw-semibold fs-4 text-theme">
                                                                        {eventDetails.STR_EVESTATUTFREE === "0" ? "Renseignez vos informations et, acceptez les conditions générales de ventes et d’utilisation" : "Choisissez votre méthode de payement."}
                                                                    </div>
                                                                </div>
                                                                <div className="checkout-widget checkout-card p-0">
                                                                    <div className='row'>
                                                                        <div className='col-lg-12'>
                                                                            <div id='payment-option-zone' className='notice flex-column rounded border-warning border border-dashed mb-9 p-6 '>
                                                                                {eventDetails && eventDetails.STR_EVESTATUTFREE != "0" && (
                                                                                    <div className='d-flex'>
                                                                                        <ul className="payment-option mb-0 p-0">
                                                                                            {paymentOptions.map(option => (
                                                                                                <li
                                                                                                    key={option.id}
                                                                                                    className={`pb-0 ${selectedOption === option.id ? 'active' : ''}`}
                                                                                                    onClick={() => handleOptionClick(option.id)}
                                                                                                >
                                                                                                    <a>
                                                                                                        <img src={option.image} alt={option.name} />
                                                                                                        <span className='text-theme'>{option.name}</span>
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                )}

                                                                                <div className='py-6 '>
                                                                                    <form id='mobile-money' className="payment-card-form">
                                                                                        {selectedOption === 2 && eventDetails.STR_EVESTATUTFREE != "0" && (
                                                                                            <div className="notice rounded border-success border border-dashed mb-3 p-6 w-100">
                                                                                                <div className="d-flex flex-column fv-row fv-plugins-icon-container">
                                                                                                    <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                                                                                        <span className="required text-theme text-success">Numero de paiement MTN</span>
                                                                                                        <span className="ms-1" data-bs-toggle="tooltip" aria-label="Specify a target name for future usage and reference" data-bs-original-title="Specify a target name for future usage and reference" data-kt-initialized="1">
                                                                                                            <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                                                                                                                <span className="path1"></span>
                                                                                                                <span className="path2"></span>
                                                                                                                <span className="path3"></span>
                                                                                                            </i>
                                                                                                        </span>
                                                                                                    </label>
                                                                                                    <input type="text" className="form-control form-control-solid"
                                                                                                        id="STR_TICPHONEPAYMENT_MTN"
                                                                                                        name="STR_TICPHONEPAYMENT_MTN"
                                                                                                        value={mtnPhonePayment}
                                                                                                        onChange={handleInputChange}
                                                                                                        placeholder="Nouméro de paiement" />
                                                                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                        <div className='row w-100'>
                                                                                            <div className="col-md-4 fv-row">
                                                                                                <label className="required fs-6 fw-semibold mb-2 text-theme">Nom</label>
                                                                                                <div className="position-relative d-flex align-items-center">
                                                                                                    <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4">
                                                                                                        <span className="path1" />
                                                                                                        <span className="path2" />
                                                                                                    </i>
                                                                                                    <input type="text" className="form-control form-control-solid bg-gray-500"
                                                                                                        value={nom} onChange={handleInputChange}
                                                                                                        placeholder="Saisir nom" name="STR_FIRSTNAME" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-4 fv-row">
                                                                                                <label className="required fs-6 fw-semibold mb-2 text-theme">Prénom</label>
                                                                                                <div className="position-relative d-flex align-items-center">
                                                                                                    <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4">
                                                                                                        <span className="path1" />
                                                                                                    </i>
                                                                                                    <input type="text" className="form-control form-control-solid bg-gray-500"
                                                                                                        value={prenom} onChange={handleInputChange}
                                                                                                        placeholder="Saisir Prénom" name="STR_LASTNAME" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-4 fv-row">
                                                                                                <label className="required fs-6 fw-semibold mb-2 text-theme">Email</label>
                                                                                                <div className="position-relative d-flex align-items-center">
                                                                                                    <i className="ki-duotone ki-calendar-8 fs-2 position-absolute mx-4">
                                                                                                        <span className="path1" />
                                                                                                        <span className="path2" />
                                                                                                    </i>
                                                                                                    <input type="email" className="form-control form-control-solid bg-gray-500"
                                                                                                        value={emailPaiement} onChange={handleInputChange}
                                                                                                        placeholder="Saisir Email" name="STR_TICMAILPAIEMENT" />
                                                                                                </div>
                                                                                                {!validateEmail(emailPaiement) && emailPaiement && (
                                                                                                    <span className="text-danger ms-2">Format email invalide</span>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                    <div class="fs-7 fw-semibold text-muted mt-5">Champs obligatoires <span className='required'></span></div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div>
                                                                    <div className={`notice d-flex mt-10  align-items-center rounded border border-dashed mb-5 p-6 h-100`}>
                                                                        {/* <input className="form-check-input mx-3" type="checkbox" name="conditions[]" value="accept" onChange={handleConditionsChange} /> */}
                                                                        <input
                                                                            className="form-check-input mx-3"
                                                                            type="checkbox"
                                                                            name="conditions[]"
                                                                            value="accept"
                                                                            onChange={handleConditionsChange}
                                                                            disabled={!isFormValid}  // Désactiver si le formulaire n'est pas valide
                                                                            checked={conditionsAccepted} // Gérer la case à cocher dynamiquement
                                                                            style={{ opacity: !isFormValid ? 0.5 : 1, cursor: !isFormValid ? 'not-allowed' : 'pointer' }}  // Griser si désactivé
                                                                        />

                                                                        <div className="d-flex flex-stack flex-grow-1 ">
                                                                            <div className="fw-semibold ">
                                                                                <h4 className="text-gray-900  m-0 fs-7 text-theme">
                                                                                    J’accepte les  <span className='text-danger' onClick={toggleConditionsModal}> Conditions Générales de Vente (CGV) et les Conditions Générales d’Utilisation (CGU)
                                                                                    </span>
                                                                                </h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex flex-stack mb-6">
                                                                        {/*begin::Title*/}
                                                                        <div className="flex-shrink-0 me-5">
                                                                            <span className="text-gray-500 fs-7 fw-bold me-2 d-block lh-1 pb-1 ">
                                                                                Vous allez payé
                                                                            </span>
                                                                            <span className="text-gray-800 fs-1 fw-bold text-theme"> {totalAmount.toLocaleString()} GNF</span>
                                                                        </div>
                                                                        {/*end::Title*/}
                                                                        <button className={`btn btn-lg rounded fs-14 pull-center ${conditionsAccepted ? 'btn-success' : 'btn-secondary'}`}
                                                                            disabled={!conditionsAccepted} onClick={handlePayment}>
                                                                            Effectuer le Paiement
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        )}
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
                                            <div className="card card-flush py-4">
                                                <div className="card-header">
                                                    <div className="card-title">
                                                        <h2 className='text-theme'>Description</h2>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <span className="text-muted">
                                                        {eventDetails.STR_EVEDESCRIPTION}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card card-flush py-4">
                                                <div className="card-header">
                                                    <div className="card-title">
                                                        <h2 className='text-theme'>Organisateur</h2>
                                                    </div>
                                                </div>
                                                <div className="card-body text-center pt-0 bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px" >

                                                    <div className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                                                        data-kt-image-input="true" >
                                                        <div className="image-input-wrapper w-150px h-150px" style={{ backgroundImage: `url(${urlBaseImage + eventDetails.STR_EVEANNONCEURPIC})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                                                    </div>

                                                    <div className="text-bold fs-7 text-theme">
                                                        {eventDetails.STR_EVEANNONCEUR}
                                                    </div>
                                                    <div className="text-muted fs-7 text-theme">
                                                        {eventDetails.STR_EVEANNONCEURDESC}
                                                    </div>
                                                </div>
                                            </div>

                                            {((showGetTicket && !datePassed) || quantiteTicketGratuit > 0) && (

                                                <div className="card card-flush rounded border-warning border border-dashed py-4">
                                                    <div className="card-header">
                                                        <div className="card-title">
                                                            <h2 className='text-theme'>Mise au point des réservations</h2>
                                                        </div>
                                                    </div>
                                                    <div className="card-body pt-0">
                                                        <span className="text-muted">
                                                            {quantiteTicketGratuit > 0 ? (
                                                                <div className="d-flex align-items-center mb-6">
                                                                    <span
                                                                        data-kt-element="bullet"
                                                                        className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                                                                    />
                                                                    <div className="flex-grow-1 me-5">
                                                                        <div className="text-gray-800 fw-semibold fs-5 text-theme">
                                                                            {eventDetails.DT_EVEBEGIN} - {eventDetails.HR_EVEBEGIN}

                                                                        </div>
                                                                        <div className="text-gray-700 fw-semibold fs-6 text-theme">
                                                                            <p className='mb-0'><span className="badge bg-light text-danger">  </span></p>
                                                                            {eventDetails.STR_EVENAME}
                                                                        </div>
                                                                    </div>
                                                                    <a
                                                                        className="btn btn-sm btn-light"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#kt_modal_create_project"
                                                                    >
                                                                        {quantiteTicketGratuit}
                                                                    </a>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {cartItems.map((item, index) => (
                                                                        <Reservations key={index} pannierData={item} index={index} />
                                                                    ))}
                                                                </>
                                                            )}
                                                        </span>
                                                        <button class="btn btn-light-warning fs-3 fw-bolder w-100 py-5 mb-13">

                                                            {totalAmount === 0 ? 'Vos billet sont gratuits' : ` ${totalAmount} GNF`}
                                                        </button>
                                                        <button class="btn btn-primary fs-3 fw-bolder w-100 py-5" onClick={handleCancelCommande}
                                                        >Annuler l’achat </button>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end details content */}
                </section>
            )}


            {loading && (
                <div className="loader">
                    <div className="spinner"></div>
                </div>
            )}
            {ConditionsModal}
            <Footer />
        </>
    );
}

export default Detail;