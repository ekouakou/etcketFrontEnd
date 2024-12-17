import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LogoFooter  from './LogoFooter'
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeProvider';
import { FaFacebook, FaEnvelope } from 'react-icons/fa'; // Importer les icônes



function Footer() {
  
  const { theme, toggleTheme } = useTheme();
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


    <footer class="footer-section">
        <div class="container">
            {/* <div class="footer-cta pt-5 pb-5">
                <div class="row">
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="fas fa-map-marker-alt"></i>
                            <div class="cta-text">
                                <h4>Nous trouver</h4>
                                <span>1010 Avenue, sw 54321, Chandigarh</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="fas fa-phone"></i>
                            <div class="cta-text">
                                <h4>Nous appeler</h4>
                                <span>9876543210 0</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="far fa-envelope-open"></i>
                            <div class="cta-text">
                                <h4>Nous envoyer un email</h4>
                                <span>mail@info.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div class="footer-content pt-5 pb-5">
                <div class="row footer-cta">
                    <div class="col-xl-3 col-lg-4 mb-50">
                        <div class="footer-widget">
                            <div class="footer-logo">
                                <NavLink exact to="/">
                                    <LogoFooter theme={theme} />
                                </NavLink>
                            </div>
                            <div class="footer-text">
                                <p>Événements, spectacles, concerts, sports et transports en Guinée : Trouvez un billet facile en ligne sur Guinée Ticket ! La solution simple et rapide pour assister à vos événements préférés.</p>
                            </div>
                            <div class="footer-social-icon mt-10">
                                <span>Suivez-nous</span>
                                <a href="https://web.facebook.com/profile.php?id=61559109494346&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaFacebook size={24} className="text-theme mb-2" />
                                </a>
                                {/* <a href="#">
                                    <i class="fab fa-facebook-f facebook-bg"></i>
                                    </a>
                                <a href="#"><i class="fab fa-twitter twitter-bg"></i></a> */}
                            </div>
                            
                        </div>
                    </div>

                    <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Guinée ticket et vous </h3>
                            </div>
                            <ul>
                                {/* <li><a href="#">Accueil</a></li> */}
                                <li>
                                    <NavLink exact to="/aboutUs" >                                                        
                                        <a href="#">À propos</a>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/contactUs" >                                                        
                                        <a href="#">Contact</a>
                                    </NavLink>
                                    
                                    </li>
                                {/* <li>
                                    <NavLink exact to="/OursServices" >                                                        
                                        <a href="#">Nos services</a>
                                    </NavLink>
                                 </li> */}
                                {/* <li><a href="#">Équipe d'experts</a></li>
                                <li><a href="#">Contactez-nous</a></li>
                                <li><a href="#">Dernières nouvelles</a></li> */}
                            </ul>
                        </div>
                    </div>
                    {/* <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Engagement qualité</h3>
                            </div>
                            <ul >
                              <li class="d-flex">
                                <img loading="lazy" src="https://www.ticketmaster.fr/img/footer/billets.svg"/>
                                <div class="list-body">Billetterie 100% Officielle</div>
                              </li>
                              <li class="d-flex">
                                <img loading="lazy" src="https://www.ticketmaster.fr/img/footer/lock.svg"/>
                              <div class="list-body">Paiement 100% sécurisé <span lang="en">(Secure Internet Payment Services)</span></div>
                              </li>
                              <li class="d-flex">
                                <img loading="lazy" src="https://www.ticketmaster.fr/img/footer/logo-avis-verifies-64.png"/>
                              <div class="list-body"><a href="https://www.avis-verifies.com/avis-clients/ticketmaster.fr" rel="noopener" target="_blank">
                                <img alt="Avis vérifiés" loading="lazy" src="https://www.ticketmaster.fr/img/footer/avis-verifies-Logo-FR.svg" width={100}/></a></div>
                              </li>
                            </ul>
                        </div>
                    </div> */}
                    <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Mentions légales</h3>
                            </div>
                            <ul>
                                <li><a  onClick={toggleConditionsModal} >Politique de confidentialité</a></li>
                                <li><a onClick={toggleConditionsModal} >Conditions générales de vente</a></li>
                                <li><a onClick={toggleConditionsModal} >Conditions générales d'utilisation</a></li>
                                {/* <li><a href="#">Nos services</a></li> */}
                                {/* <li><a href="#">Équipe d'experts</a></li>
                                <li><a href="#">Contactez-nous</a></li>
                                <li><a href="#">Dernières nouvelles</a></li> */}
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Newsletters</h3>
                            </div>
                            <ul class="list-1 p-0">
                              {/* <li>
                                <NavLink exact to="/signIn" >                                                        
                                    <a  >Votre compte / Vos commandes</a>
                                </NavLink>
                                </li> */}
                                <li>
                                <form className="d-flex">
                                    <input
                                        type="email"
                                        className="form-control me-2"
                                        placeholder="Entrez votre email"
                                        required
                                    />
                                    <button type="submit" className="btn btn-danger d-flex align-items-center">
                                        <FaEnvelope className="me-2" /> {/* Icône avant le texte */}
                                    </button>
                                </form>
                                </li>
                              {/* <li><a href="#">Vos alertes et newsletters</a></li> */}
                            </ul>
                        </div>
                    </div>
                    {/* <div class="col-xl-3 col-lg-4 col-md-6 mb-50">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Abonnez-vous</h3>
                            </div>
                            <div class="footer-text mb-25">
                                <p>Ne manquez pas de vous abonner à nos nouveaux flux, veuillez remplir le formulaire ci-dessous.</p>
                            </div>
                            <div class="subscribe-form mt-4">
                                <form action="#">
                                    <input type="text" placeholder="Adresse e-mail"/>
                                    <button><i class="fab fa-telegram-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div> */}
                    
                </div>
            </div>

            {/* <div class=" pb-5">
                <div className='row'>
                    <div className='col-lg-3'>
                      <a className=' center-align-items' href="#" rel="noopener" target="_blank">
                        <img className='d-block mx-auto' loading="lazy" src="https://www.ticketmaster.fr/img/footer/Help-faq.svg" height={70}/>
                        <p className='text-center mt-3'>Aide / FAQ / Contact</p>
                        <p class=" text-center">Trouvez immédiatement des réponses à vos questions grâce à notre aide en ligne</p>
                      </a>
                    </div>

                    <div className='col-lg-3'>
                      <a className=' center-align-items' href="#" rel="noopener" target="_blank">
                        <img className='d-block mx-auto' loading="lazy" src="https://www.ticketmaster.fr/img/footer/Box-Office-Collection.svg" height={70}/>
                        <p className='text-center mt-3'>Retrait en magasin</p>
                        <p class=" text-center">Retirez gratuitement vos billets partout en France dans plus de 1600 points de vente</p>
                      </a>
                    </div>

                    <div className='col-lg-3'>
                      <a className=' center-align-items' href="#" rel="noopener" target="_blank">
                        <img className='d-block mx-auto' loading="lazy" src="https://www.ticketmaster.fr/img/footer/umbrella.svg" height={70}/>
                        <p className='text-center mt-3'>RAssurance annulation</p>
                        <p class=" text-center">Réservez vos billets en toute confiance et sérénité</p>
                      </a>
                    </div>

                    <div className='col-lg-3'>
                      <a className=' center-align-items' href="#" rel="noopener" target="_blank">
                        <img className='d-block mx-auto' loading="lazy" src="https://www.ticketmaster.fr/img/footer/CollectorTicket-fr.svg" height={70}/>
                        <p className='text-center mt-3'>Billetcollector™</p>
                        <p class=" text-center">Le billet souvenir pour tous les fans. Un produit exclusif Ticketmaster®</p>
                      </a>
                    </div>
                  </div>
            </div> */}
        </div>

        



       


        <div class="copyright-area">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div class="copyright-text">
                            <p>2024 &copy; Tous droits réservés <a href="#">Afridigicom</a></p>
                        </div>
                    </div>
                    {/* <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                        <div class="footer-menu">
                            <ul>
                                <li><a href="#">Accueil</a></li>
                                <li><a href="#">Termes</a></li>
                                <li><a href="#">Confidentialité</a></li>
                                <li><a href="#">Politique</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        {ConditionsModal}
    </footer>
  );
}

export default Footer;