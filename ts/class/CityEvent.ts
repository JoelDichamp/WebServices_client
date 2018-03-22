import $ from "jquery";
import { Category } from "./Category";
import { DateEvent } from "./DateEvent";

export class CityEvent {

    private id: number = 0;

    private event_name: string;
    private description: string;
    private category: Category;
    private date: Date;
    private spot: string;
    
    private $dom: JQuery<HTMLElement>;
    private $event_name: JQuery<HTMLElement>;
    private $description: JQuery<HTMLElement>;
    private $category: JQuery<HTMLElement>;
    private $date: JQuery<HTMLElement>;
    private $spot : JQuery<HTMLElement>;
    
    constructor( event_name: string, description: string, category: Category, date: Date, spot:string) {
        this.event_name = event_name;
        this.description = description;
        this.category = category;
        this.date = date;
        this.spot = spot;
    }

    setId( id: number ): void {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setEvent_name( event_name: string ) {
        this.event_name = event_name;
    }

    getEvent_name() {
        return this.event_name;
    }

    setDescription( description: string ) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setSpot( spot: string ) {
        this.spot = spot;
    }

    getSpot() {
        return this.spot;
    }

    setDate( date: Date ) {
        this.date = date;
    }

    getDate() {
        return this.date;
    }

    setCategory( category: Category ) {
        this.category = category;
    }

    getCategory() {
        return this.category;
    }

    render( $parent: JQuery<HTMLDivElement> ) {
        let html: string = "<div class='city-event'>";
            html += "<div class='edit'>📝</div>";
            html += "<div class='remove'>X</div>";  
        html += "</div>"; 

        this.$dom = $( html );
        this.$event_name = $( "<h2>" + this.event_name + "</h2>" );

        this.$category = $( "<h3>" + this.category.getCategory_name() + "</h3>" );

        this.$description = $( "<div class='description'>" + this.description + "</div>" );

        let $div_spot: JQuery<HTMLElement> = $( "<div>à</div>" );
        this.$spot = $( "<h3>" + this.spot + "</h3>" );

        let $div_date: JQuery<HTMLElement> = $( "<div>le</div>" );
        
        this.$date = $( "<h3 class='date-event'>" + DateEvent.toDiv( this.date ) + "</h3>" );

        this.$dom.append( this.$event_name );

        this.$dom.append( this.$category );

        this.$dom.append( this.$description );

        this.$dom.append( $div_spot );
        this.$dom.append( this.$spot );

        this.$dom.append( $div_date );
        this.$dom.append( this.$date );

        $parent.append(this.$dom);
    }

    update() {
        this.$event_name.html( this.event_name );
        this.$description.html( this.description );
        this.$category.html( this.category.getCategory_name() );
        this.$date.html( DateEvent.toDiv( this.date ) );
        this.$spot.html( this.spot );
    }

    remove() {
        this.$dom.remove();
    }

    //méthode magique pour JSON.stringify
    toJSON() {
        return {
            event_name: this.event_name,
            description: this.description,
            category: this.category,
            date: this.date,
            spot: this.spot
        };
    }

}