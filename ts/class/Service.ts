import $ from "jquery";

const 
    API_BASE_URL = "http://localhost/Exercices/APIS/CityEvents2/";

export class Service {

    getAllCategories( callback: JQuery.Ajax.SuccessCallback<{ 
        success: boolean, 
        categories: { id: number, category_name: string }[] }> ) {

        $.ajax({
            url: API_BASE_URL + "categories",
            method: "GET",
            dataType: "json",
            success: callback,
            error: function( err ){
                console.log(err);
            }
        }); 
    }

    getAllCityEvents( callback: JQuery.Ajax.SuccessCallback<{ 
        success: boolean,
        cityEvents: { 
            id: number, 
            event_name: string, 
            description: string,
            date: string, 
            spot: string, 
            id_category: number}[] }> ) {

        $.ajax({
            url: API_BASE_URL + "cityEvents",
            method: "GET",
            dataType: "json",
            success: callback,
            error: function( err ){
                console.log(err);
            }
        }); 
    }

    createCityEvent( data: {event_name: string, description: string, spot: string, date: string, id_category: number}, 
        callback: JQuery.Ajax.SuccessCallback<{ 
            success: boolean,
            id: number,
            message: string }> ) {

        $.ajax ({
            url: API_BASE_URL + "cityEvent",
            method: "POST",
            data: data,
            dataType: "json",
            success: callback,
            error: function( err ){
                console.log( err );
            }
        });
    }

    updateCityEvent( data: {event_name: string, description: string, spot: string, date: string, id_category: number}, id: number, 
        callback: JQuery.Ajax.SuccessCallback<{ success: boolean }>) {

        $.ajax ({
            url: API_BASE_URL + "cityEvent/" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: callback,
            error: function( err ){
                console.log( err );
            }
        });
    }

    deleteCityEvent( id: number, callback: JQuery.Ajax.SuccessCallback<{ success: boolean }> ) {
        $.ajax ({
            url: API_BASE_URL + "cityEvent/" + id,
            method: "DELETE",
            dataType: "json",
            success: callback,
            error: function( err ){
                console.log( err );
            }
        });
    }
}