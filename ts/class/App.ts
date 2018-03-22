import $ from "jquery";
import { CityEvent } from "./CityEvent";
import { Service } from "./Service";
import { Category } from "./Category";
import { DateEvent } from "./DateEvent";

class App {

    private $overlay: JQuery<HTMLDivElement>;
    private $msg_modal: JQuery<HTMLParagraphElement>;
    public $btn_cancel: JQuery<HTMLButtonElement>;
    public $btn_confirm: JQuery<HTMLButtonElement>;

    public $form_cityEvent: JQuery<HTMLFormElement>;
    private $event_name: JQuery<HTMLInputElement>;
    private $description: JQuery<HTMLTextAreaElement>;
    private $spot : JQuery<HTMLInputElement>;
    private $category_selected: JQuery<HTMLSelectElement>;
    private $event_date: JQuery<HTMLInputElement>;
    private $event_time: JQuery<HTMLInputElement>;
    private $ul_error: JQuery<HTMLElement>; 

    public $cityEvent_container : JQuery<HTMLDivElement>;
    private $submit : JQuery<HTMLInputElement>;

    private cityEvents: CityEvent[] = [];
    private edited_cityEvent: CityEvent;
    private edition_mode: boolean = false;

    private positionEventToDelete: number = -1;

    private categories: Category[] = [];

    private service: Service;

    constructor() {

        this.getElementsInterface();
        this.service = new Service();
    }

    getEdition_mode() {

        return this.edition_mode;
    }

    setEdition_mode( edition_mode: boolean ) {

        this.edition_mode = edition_mode;
    }

    getPositionEventToDelete(): number {

        return this.positionEventToDelete;
    }

    setPositionEventToDelete( position: number ) {
        this.positionEventToDelete = position;
    }

    getElementsInterface() {

        this.getElementsModal();
        this.$cityEvent_container = $("#city-events") as JQuery<HTMLDivElement>;
        this.$form_cityEvent = $("#add-city-event") as JQuery<HTMLFormElement>;
        this.$event_name = $("#event-name") as JQuery<HTMLInputElement>;
        this.$description = $("#description") as JQuery<HTMLTextAreaElement>;
        this.$spot = $("#event-spot") as JQuery<HTMLInputElement>;
        this.$event_date = $("#event-date") as JQuery<HTMLInputElement>;
        this.$event_time = $("#event-time") as JQuery<HTMLInputElement>;
        this.$category_selected = $("#category") as JQuery<HTMLSelectElement>;
        this.$ul_error = $("#error") as JQuery<HTMLElement>; 
        this.$submit = $("#submit") as JQuery<HTMLInputElement>;;
    }

    getElementsModal() {
        this.$overlay = $(".overlay") as JQuery<HTMLDivElement>;
        this.$btn_cancel = $(".cancel") as JQuery<HTMLButtonElement>;
        this.$btn_confirm = $(".confirm") as JQuery<HTMLButtonElement>;
        this.$msg_modal = $("#msg-modal") as JQuery<HTMLParagraphElement>;
        this.showModalConfirmDelete( false );
    }

    resetForm() {

        this.$event_name.val("");
        this.$description.val("");
        this.$spot.val("");
        this.$event_date.val("jj/mm/aaaa");
        this.$event_time.val("--:--");
        this.$submit.val("Ajouter");

        //coupe le mode édition
        this.edition_mode = false;
    }

    showModalConfirmDelete( show: boolean ) {
        if ( show ) {
            let evt: string = this.cityEvents[ this.positionEventToDelete ].getEvent_name();
            if ( evt.length > 20 ) {
                evt = evt.substr( 0, 20 ) + "...";
            }
            this.$msg_modal.html( "Confirmez-vous la suppression de l'évènement '" + evt +"' ?" ) ;
            this.$overlay.css('display','block');
        } else {
            this.$overlay.css('display','none');
        }
    }

    showErrors( view_errors: boolean ): void {
        if ( view_errors ) {
            this.$ul_error.css('display','block');
        } else {
            this.$ul_error.css('display','none');
        }
    }

    putMsg( status: { ok: boolean, msg: string } ): void {
        this.$ul_error.html( status.msg );
        this.showErrors( true );
    }

    putErrorStatus( msg_err: string, status: { ok: boolean, msg: string } ): void {
        status.ok = false; 
        status.msg += '<li>' + msg_err + '</li>';
    }

    validStringValue( s: string, msg_err: string, status: { ok: boolean, msg: string } ): void {
        if ( !s ) {
            this.putErrorStatus( msg_err, status );
        }
    }

    checkForm(data: { event_name: string, description: string, spot: string, date: string, id_category: number }): {ok: boolean, msg: string} {
        var status: { ok: boolean, msg: string } = { ok: true, msg: "" };

        this.validStringValue( data.event_name, "L'évènement n'a pas été saisi !", status);
        this.validStringValue( data.description, "La description n'a pas été saisie !", status);
        this.validStringValue( data.spot, "Le lieu n'a pas été saisi !", status);

        const date_event: string = this.$event_date.val() as string;
        this.validStringValue( date_event, "La date n'a pas été saisie !", status);

        const time_event: string = this.$event_time.val() as string;
        this.validStringValue( time_event, "L'horaire n'a pas été saisi !", status);

        data.date = date_event + " " + time_event;

        return status;
    }

    prepareData( data: { event_name: string, description: string, spot: string, date: string, id_category: number }): {ok: boolean, msg: string} {

        const event_name: string = this.$event_name.val() as string;
        const description: string = this.$description.val() as string;
        const spot: string = this.$spot.val() as string;
        const id_category: number = this.$category_selected.val() as number;

        data.event_name = event_name;
        data.description = description;
        data.spot = spot;
        data.id_category = id_category;

        return this.checkForm( data );
    }

    addCityEvent(): boolean {

        let createData: { event_name: string, description: string, spot: string, date: string, id_category: number } = 
            { event_name: "", description: "", spot: "", date: "", id_category: 0};

        let status: {ok: boolean, msg: string} = this.prepareData( createData );
        if ( !status.ok ) {
            this.putMsg( status );
            return false;
        }

        this.service.createCityEvent( createData, ( response ) => {
            if ( response.success ) {
                const date_event: Date = new Date( createData.date );
                const cityEvent = new CityEvent( createData.event_name,
                                                 createData.description,
                                                 this.getCategory( createData.id_category ), 
                                                 date_event, 
                                                 createData.spot );
                cityEvent.setId( response.id );
                // console.log(cityEvent);
                this.cityEvents.push( cityEvent );
        
                cityEvent.render( this.$cityEvent_container );
                this.resetForm();
            } else {
                console.log("L'évènement' ne peut pas être créé !"); 
            }
        });

        return true;
    }

    updateCityEvent(): boolean {

        let updateData: { event_name: string, description: string, spot: string, date: string, id_category: number } = 
        { event_name: "", description: "", spot: "", date: "", id_category: 0};

        if ( !this.prepareData( updateData ) ) return false;

        // console.log(updateData); console.log(this.edited_cityEvent.getId());
        
        this.service.updateCityEvent( updateData, this.edited_cityEvent.getId(), ( response ) => {
            if ( response.success ) {
                this.edited_cityEvent.setEvent_name( updateData.event_name );
                this.edited_cityEvent.setDescription( updateData.description);
                this.edited_cityEvent.setSpot( updateData.spot );
                this.edited_cityEvent.setDate( new Date( updateData.date ) );
                this.edited_cityEvent.setCategory( this.getCategory( updateData.id_category ) );

                this.edited_cityEvent.update();
                this.resetForm();
            } else {
                console.log( "Edition impossible !" );
            }    
        });

        return true;
        }

    

    removeCityEventAtIndex() {
        let position = this.getPositionEventToDelete();
        const cityEvent = this.cityEvents[ position ];
        this.service.deleteCityEvent( cityEvent.getId(), ( response ) => {
            if ( response.success ) {
                cityEvent.remove();
                this.cityEvents.splice( position, 1 ); //supprime l'elt d'index position et on précise le nbre d'elts à supprimer, ici 1
            } else {
                console.log( "Suppression impossible" )
            }
        });  
    }

    editCityEventAtIndex( position: number ) {

        this.edition_mode = true;
        this.edited_cityEvent = this.cityEvents[ position ];
        // console.log(this.edited_cityEvent);

        this.$submit.val( "Editer" );
        this.$event_name.val( this.edited_cityEvent.getEvent_name());
        this.$description.val( this.edited_cityEvent.getDescription());
        this.$spot.val( this.edited_cityEvent.getSpot());

        let d: Date = this.edited_cityEvent.getDate();
        this.$event_date.val( DateEvent.toInputDate( d ));
        this.$event_time.val( DateEvent.toInputTime( d ) );

        this.$category_selected.val( this.edited_cityEvent.getCategory().getId_category() );
    }

    loadCategoriesFromDb() {

        this.service.getAllCategories( ( response ) => {
            if ( response.success ) {
                this.generateCategories( response.categories );
                this.loadCityEventsFromDb();
            } else {
                this.categories = [];
            }
        });
    }

    generateCategories( json_categories: { 
        id: number, 
        category_name: string }[] ) {

        for (let json_categorie of json_categories) {
            const category: Category = new Category( json_categorie.id, json_categorie.category_name );
            this.categories.push( category );
            category.render( this.$category_selected );
        }
    }

    loadCityEventsFromDb() {

        this.service.getAllCityEvents( ( response ) => {
            if ( response.success ) {
                this.generateCityEvents( response.cityEvents );
            } else {
                this.cityEvents = [];
            }
        });
    }

    generateCityEvents( json_cityEvents: {
        id: number, 
        event_name: string, 
        description: string,
        date: string, 
        spot: string, 
        id_category: number}[] ) {

        // console.log(json_cityEvents);

        for( let json_cityEvent of json_cityEvents ) {

            const date: Date = new Date( json_cityEvent.date );

            const cityEvent: CityEvent = new CityEvent( json_cityEvent.event_name, 
                                                        json_cityEvent.description,
                                                        this.getCategory( json_cityEvent.id_category ), 
                                                        date, 
                                                        json_cityEvent.spot);
            cityEvent.setId( json_cityEvent.id );

            this.cityEvents.push( cityEvent );
            cityEvent.render( this.$cityEvent_container );
        }
    }

    getCategory( id_category: number ): Category {

        for ( let c of this.categories ) {
            if ( c.getId_category() == id_category ) {
                return c;
            }
        }

        return Category.empty();
    }
}

const app: App = new App;
export { app };