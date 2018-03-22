import $ from "jquery";

export class Category {

    static empty(): Category {
        return new Category();
    }

    private id: number = 0;
    private category_name: string;

    constructor( id: number = 0, category_name: string = "") {
        this.id = id;
        this.category_name = category_name;
    }

    getCategory_name() {
        return this.category_name;
    }

    getId_category() {
        return this.id;
    }

    render( $parent: JQuery<HTMLSelectElement> ) {
        let $option: JQuery<HTMLElement> = $('<option id="' + this.id + '" value="' + this.id + '">' + this.category_name + '</option>');
        $parent.append( $option );
    }
}