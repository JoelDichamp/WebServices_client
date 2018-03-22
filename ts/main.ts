import { app } from "./class/App";
import $ from "jquery";

console.log( "Version: " + $.fn.jquery );
let d: Date = new Date();
let options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};
console.log( d.toLocaleDateString("fr", options));

app.loadCategoriesFromDb();

app.$form_cityEvent.submit( function( event: JQuery.Event ){
    //empêche le rechargement de la page au submit
    event.preventDefault();

    //si on est en mode édition
    if ( app.getEdition_mode() ) {
        app.updateCityEvent();
    } else {
        app.addCityEvent();        
    }
});

app.$cityEvent_container.on("click", ".remove, .edit", function() {
    app.showErrors( false );
    const $this: JQuery<HTMLElement> = $(this); //pour limiter les accès au dom
    const $parent: JQuery<HTMLElement> = $this.parent();
    const $cityEvents: JQuery<HTMLDivElement> = app.$cityEvent_container.find(".city-event"); //cherche les enfants .city-event 
    const position: number = $cityEvents.index( $parent );
    
    if ( $this.hasClass("remove") ) {
        app.setPositionEventToDelete( position );
        app.showModalConfirmDelete( true );
    } else {
        app.editCityEventAtIndex( position ); 
    }   
});

app.$btn_confirm.on("click", function() {
    app.showModalConfirmDelete( false );
    app.removeCityEventAtIndex();
    app.resetForm();
});

app.$btn_cancel.on("click", function(){
    app.showModalConfirmDelete( false );
});

app.$form_cityEvent.on("click", "input[type!='submit'], textarea, select", function() {
    app.showErrors( false );
});

app.$cityEvent_container.on("click", function( event ){
    const target: HTMLElement = event.target as HTMLElement;
    if ( target.id == "city-events" ) {
        if ( app.getEdition_mode() ) {
            app.resetForm(); 
        }
    }
})
    