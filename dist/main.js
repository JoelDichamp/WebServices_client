System.register("class/Category", ["jquery"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jquery_1, Category;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            Category = class Category {
                constructor(id = 0, category_name = "") {
                    this.id = 0;
                    this.id = id;
                    this.category_name = category_name;
                }
                static empty() {
                    return new Category();
                }
                getCategory_name() {
                    return this.category_name;
                }
                getId_category() {
                    return this.id;
                }
                render($parent) {
                    let $option = jquery_1.default('<option id="' + this.id + '" value="' + this.id + '">' + this.category_name + '</option>');
                    $parent.append($option);
                }
            };
            exports_1("Category", Category);
        }
    };
});
System.register("class/DateEvent", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var DateEvent;
    return {
        setters: [],
        execute: function () {
            DateEvent = class DateEvent {
                static toDiv(d) {
                    let options = {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    };
                    return d.toLocaleString("fr", options).replace('à', '-').replace(':', 'H');
                }
                static toInputDate(d) {
                    let year = d.getFullYear().toString(10);
                    let month = this.formatInt(d.getMonth() + 1);
                    let day = this.formatInt(d.getDate());
                    return year + '-' + month + '-' + day;
                }
                static toInputTime(d) {
                    let hours = this.formatInt(d.getHours());
                    let minutes = this.formatInt(d.getMinutes());
                    return hours + ':' + minutes;
                }
                static formatInt(v) {
                    let s = v.toString(10);
                    if (v < 10) {
                        s = '0' + s;
                    }
                    return s;
                }
            };
            exports_2("DateEvent", DateEvent);
        }
    };
});
System.register("class/CityEvent", ["jquery", "class/DateEvent"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var jquery_2, DateEvent_1, CityEvent;
    return {
        setters: [
            function (jquery_2_1) {
                jquery_2 = jquery_2_1;
            },
            function (DateEvent_1_1) {
                DateEvent_1 = DateEvent_1_1;
            }
        ],
        execute: function () {
            CityEvent = class CityEvent {
                constructor(event_name, description, category, date, spot) {
                    this.id = 0;
                    this.event_name = event_name;
                    this.description = description;
                    this.category = category;
                    this.date = date;
                    this.spot = spot;
                }
                setId(id) {
                    this.id = id;
                }
                getId() {
                    return this.id;
                }
                setEvent_name(event_name) {
                    this.event_name = event_name;
                }
                getEvent_name() {
                    return this.event_name;
                }
                setDescription(description) {
                    this.description = description;
                }
                getDescription() {
                    return this.description;
                }
                setSpot(spot) {
                    this.spot = spot;
                }
                getSpot() {
                    return this.spot;
                }
                setDate(date) {
                    this.date = date;
                }
                getDate() {
                    return this.date;
                }
                setCategory(category) {
                    this.category = category;
                }
                getCategory() {
                    return this.category;
                }
                render($parent) {
                    let html = "<div class='city-event'>";
                    html += "<div class='edit'>📝</div>";
                    html += "<div class='remove'>X</div>";
                    html += "</div>";
                    this.$dom = jquery_2.default(html);
                    this.$event_name = jquery_2.default("<h2>" + this.event_name + "</h2>");
                    this.$category = jquery_2.default("<h3>" + this.category.getCategory_name() + "</h3>");
                    this.$description = jquery_2.default("<div class='description'>" + this.description + "</div>");
                    let $div_spot = jquery_2.default("<div>à</div>");
                    this.$spot = jquery_2.default("<h3>" + this.spot + "</h3>");
                    let $div_date = jquery_2.default("<div>le</div>");
                    this.$date = jquery_2.default("<h3 class='date-event'>" + DateEvent_1.DateEvent.toDiv(this.date) + "</h3>");
                    this.$dom.append(this.$event_name);
                    this.$dom.append(this.$category);
                    this.$dom.append(this.$description);
                    this.$dom.append($div_spot);
                    this.$dom.append(this.$spot);
                    this.$dom.append($div_date);
                    this.$dom.append(this.$date);
                    $parent.append(this.$dom);
                }
                update() {
                    this.$event_name.html(this.event_name);
                    this.$description.html(this.description);
                    this.$category.html(this.category.getCategory_name());
                    this.$date.html(DateEvent_1.DateEvent.toDiv(this.date));
                    this.$spot.html(this.spot);
                }
                remove() {
                    this.$dom.remove();
                }
                toJSON() {
                    return {
                        event_name: this.event_name,
                        description: this.description,
                        category: this.category,
                        date: this.date,
                        spot: this.spot
                    };
                }
            };
            exports_3("CityEvent", CityEvent);
        }
    };
});
System.register("class/Service", ["jquery"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var jquery_3, API_BASE_URL, Service;
    return {
        setters: [
            function (jquery_3_1) {
                jquery_3 = jquery_3_1;
            }
        ],
        execute: function () {
            API_BASE_URL = "http://localhost/Exercices/APIS/CityEvents2/";
            Service = class Service {
                getAllCategories(callback) {
                    jquery_3.default.ajax({
                        url: API_BASE_URL + "categories",
                        method: "GET",
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                getAllCityEvents(callback) {
                    jquery_3.default.ajax({
                        url: API_BASE_URL + "cityEvents",
                        method: "GET",
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                createCityEvent(data, callback) {
                    jquery_3.default.ajax({
                        url: API_BASE_URL + "cityEvent",
                        method: "POST",
                        data: data,
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                updateCityEvent(data, id, callback) {
                    jquery_3.default.ajax({
                        url: API_BASE_URL + "cityEvent/" + id,
                        method: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                deleteCityEvent(id, callback) {
                    jquery_3.default.ajax({
                        url: API_BASE_URL + "cityEvent/" + id,
                        method: "DELETE",
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            };
            exports_4("Service", Service);
        }
    };
});
System.register("class/App", ["jquery", "class/CityEvent", "class/Service", "class/Category", "class/DateEvent"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var jquery_4, CityEvent_1, Service_1, Category_1, DateEvent_2, App, app;
    return {
        setters: [
            function (jquery_4_1) {
                jquery_4 = jquery_4_1;
            },
            function (CityEvent_1_1) {
                CityEvent_1 = CityEvent_1_1;
            },
            function (Service_1_1) {
                Service_1 = Service_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (DateEvent_2_1) {
                DateEvent_2 = DateEvent_2_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.cityEvents = [];
                    this.edition_mode = false;
                    this.positionEventToDelete = -1;
                    this.categories = [];
                    this.getElementsInterface();
                    this.service = new Service_1.Service();
                }
                getEdition_mode() {
                    return this.edition_mode;
                }
                setEdition_mode(edition_mode) {
                    this.edition_mode = edition_mode;
                }
                getPositionEventToDelete() {
                    return this.positionEventToDelete;
                }
                setPositionEventToDelete(position) {
                    this.positionEventToDelete = position;
                }
                getElementsInterface() {
                    this.getElementsModal();
                    this.$cityEvent_container = jquery_4.default("#city-events");
                    this.$form_cityEvent = jquery_4.default("#add-city-event");
                    this.$event_name = jquery_4.default("#event-name");
                    this.$description = jquery_4.default("#description");
                    this.$spot = jquery_4.default("#event-spot");
                    this.$event_date = jquery_4.default("#event-date");
                    this.$event_time = jquery_4.default("#event-time");
                    this.$category_selected = jquery_4.default("#category");
                    this.$ul_error = jquery_4.default("#error");
                    this.$submit = jquery_4.default("#submit");
                    ;
                }
                getElementsModal() {
                    this.$overlay = jquery_4.default(".overlay");
                    this.$btn_cancel = jquery_4.default(".cancel");
                    this.$btn_confirm = jquery_4.default(".confirm");
                    this.$msg_modal = jquery_4.default("#msg-modal");
                    this.showModalConfirmDelete(false);
                }
                resetForm() {
                    this.$event_name.val("");
                    this.$description.val("");
                    this.$spot.val("");
                    this.$event_date.val("jj/mm/aaaa");
                    this.$event_time.val("--:--");
                    this.$submit.val("Ajouter");
                    this.edition_mode = false;
                }
                showModalConfirmDelete(show) {
                    if (show) {
                        let evt = this.cityEvents[this.positionEventToDelete].getEvent_name();
                        if (evt.length > 20) {
                            evt = evt.substr(0, 20) + "...";
                        }
                        this.$msg_modal.html("Confirmez-vous la suppression de l'évènement '" + evt + "' ?");
                        this.$overlay.css('display', 'block');
                    }
                    else {
                        this.$overlay.css('display', 'none');
                    }
                }
                showErrors(view_errors) {
                    if (view_errors) {
                        this.$ul_error.css('display', 'block');
                    }
                    else {
                        this.$ul_error.css('display', 'none');
                    }
                }
                putMsg(status) {
                    this.$ul_error.html(status.msg);
                    this.showErrors(true);
                }
                putErrorStatus(msg_err, status) {
                    status.ok = false;
                    status.msg += '<li>' + msg_err + '</li>';
                }
                validStringValue(s, msg_err, status) {
                    if (!s) {
                        this.putErrorStatus(msg_err, status);
                    }
                }
                checkForm(data) {
                    var status = { ok: true, msg: "" };
                    this.validStringValue(data.event_name, "L'évènement n'a pas été saisi !", status);
                    this.validStringValue(data.description, "La description n'a pas été saisie !", status);
                    this.validStringValue(data.spot, "Le lieu n'a pas été saisi !", status);
                    const date_event = this.$event_date.val();
                    this.validStringValue(date_event, "La date n'a pas été saisie !", status);
                    const time_event = this.$event_time.val();
                    this.validStringValue(time_event, "L'horaire n'a pas été saisi !", status);
                    data.date = date_event + " " + time_event;
                    return status;
                }
                prepareData(data) {
                    const event_name = this.$event_name.val();
                    const description = this.$description.val();
                    const spot = this.$spot.val();
                    const id_category = this.$category_selected.val();
                    data.event_name = event_name;
                    data.description = description;
                    data.spot = spot;
                    data.id_category = id_category;
                    return this.checkForm(data);
                }
                addCityEvent() {
                    let createData = { event_name: "", description: "", spot: "", date: "", id_category: 0 };
                    let status = this.prepareData(createData);
                    if (!status.ok) {
                        this.putMsg(status);
                        return false;
                    }
                    this.service.createCityEvent(createData, (response) => {
                        if (response.success) {
                            const date_event = new Date(createData.date);
                            const cityEvent = new CityEvent_1.CityEvent(createData.event_name, createData.description, this.getCategory(createData.id_category), date_event, createData.spot);
                            cityEvent.setId(response.id);
                            this.cityEvents.push(cityEvent);
                            cityEvent.render(this.$cityEvent_container);
                            this.resetForm();
                        }
                        else {
                            console.log("L'évènement' ne peut pas être créé !");
                        }
                    });
                    return true;
                }
                updateCityEvent() {
                    let updateData = { event_name: "", description: "", spot: "", date: "", id_category: 0 };
                    if (!this.prepareData(updateData))
                        return false;
                    this.service.updateCityEvent(updateData, this.edited_cityEvent.getId(), (response) => {
                        if (response.success) {
                            this.edited_cityEvent.setEvent_name(updateData.event_name);
                            this.edited_cityEvent.setDescription(updateData.description);
                            this.edited_cityEvent.setSpot(updateData.spot);
                            this.edited_cityEvent.setDate(new Date(updateData.date));
                            this.edited_cityEvent.setCategory(this.getCategory(updateData.id_category));
                            this.edited_cityEvent.update();
                            this.resetForm();
                        }
                        else {
                            console.log("Edition impossible !");
                        }
                    });
                    return true;
                }
                removeCityEventAtIndex() {
                    let position = this.getPositionEventToDelete();
                    const cityEvent = this.cityEvents[position];
                    this.service.deleteCityEvent(cityEvent.getId(), (response) => {
                        if (response.success) {
                            cityEvent.remove();
                            this.cityEvents.splice(position, 1);
                        }
                        else {
                            console.log("Suppression impossible");
                        }
                    });
                }
                editCityEventAtIndex(position) {
                    this.edition_mode = true;
                    this.edited_cityEvent = this.cityEvents[position];
                    this.$submit.val("Editer");
                    this.$event_name.val(this.edited_cityEvent.getEvent_name());
                    this.$description.val(this.edited_cityEvent.getDescription());
                    this.$spot.val(this.edited_cityEvent.getSpot());
                    let d = this.edited_cityEvent.getDate();
                    this.$event_date.val(DateEvent_2.DateEvent.toInputDate(d));
                    this.$event_time.val(DateEvent_2.DateEvent.toInputTime(d));
                    this.$category_selected.val(this.edited_cityEvent.getCategory().getId_category());
                }
                loadCategoriesFromDb() {
                    this.service.getAllCategories((response) => {
                        if (response.success) {
                            this.generateCategories(response.categories);
                            this.loadCityEventsFromDb();
                        }
                        else {
                            this.categories = [];
                        }
                    });
                }
                generateCategories(json_categories) {
                    for (let json_categorie of json_categories) {
                        const category = new Category_1.Category(json_categorie.id, json_categorie.category_name);
                        this.categories.push(category);
                        category.render(this.$category_selected);
                    }
                }
                loadCityEventsFromDb() {
                    this.service.getAllCityEvents((response) => {
                        if (response.success) {
                            this.generateCityEvents(response.cityEvents);
                        }
                        else {
                            this.cityEvents = [];
                        }
                    });
                }
                generateCityEvents(json_cityEvents) {
                    for (let json_cityEvent of json_cityEvents) {
                        const date = new Date(json_cityEvent.date);
                        const cityEvent = new CityEvent_1.CityEvent(json_cityEvent.event_name, json_cityEvent.description, this.getCategory(json_cityEvent.id_category), date, json_cityEvent.spot);
                        cityEvent.setId(json_cityEvent.id);
                        this.cityEvents.push(cityEvent);
                        cityEvent.render(this.$cityEvent_container);
                    }
                }
                getCategory(id_category) {
                    for (let c of this.categories) {
                        if (c.getId_category() == id_category) {
                            return c;
                        }
                    }
                    return Category_1.Category.empty();
                }
            };
            app = new App;
            exports_5("app", app);
        }
    };
});
System.register("main", ["class/App", "jquery"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var App_1, jquery_5, d, options;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (jquery_5_1) {
                jquery_5 = jquery_5_1;
            }
        ],
        execute: function () {
            console.log("Version: " + jquery_5.default.fn.jquery);
            d = new Date();
            options = {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            };
            console.log(d.toLocaleDateString("fr", options));
            App_1.app.loadCategoriesFromDb();
            App_1.app.$form_cityEvent.submit(function (event) {
                event.preventDefault();
                if (App_1.app.getEdition_mode()) {
                    App_1.app.updateCityEvent();
                }
                else {
                    App_1.app.addCityEvent();
                }
            });
            App_1.app.$cityEvent_container.on("click", ".remove, .edit", function () {
                App_1.app.showErrors(false);
                const $this = jquery_5.default(this);
                const $parent = $this.parent();
                const $cityEvents = App_1.app.$cityEvent_container.find(".city-event");
                const position = $cityEvents.index($parent);
                if ($this.hasClass("remove")) {
                    App_1.app.setPositionEventToDelete(position);
                    App_1.app.showModalConfirmDelete(true);
                }
                else {
                    App_1.app.editCityEventAtIndex(position);
                }
            });
            App_1.app.$btn_confirm.on("click", function () {
                App_1.app.showModalConfirmDelete(false);
                App_1.app.removeCityEventAtIndex();
                App_1.app.resetForm();
            });
            App_1.app.$btn_cancel.on("click", function () {
                App_1.app.showModalConfirmDelete(false);
            });
            App_1.app.$form_cityEvent.on("click", "input[type!='submit'], textarea, select", function () {
                App_1.app.showErrors(false);
            });
            App_1.app.$cityEvent_container.on("click", function (event) {
                const target = event.target;
                if (target.id == "city-events") {
                    if (App_1.app.getEdition_mode()) {
                        App_1.app.resetForm();
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=main.js.map