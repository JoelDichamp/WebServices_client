export class DateEvent {

    static toDiv( d: Date ): string {
        let options = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };

        return d.toLocaleString("fr",options).replace('à','-').replace(':','H');
    }

    static toInputDate( d: Date ): string {
        let year: string = d.getFullYear().toString( 10 );
        let month: string = this.formatInt( d.getMonth() + 1 );
        let day: string = this.formatInt( d.getDate() );

        return year + '-' + month + '-' + day;
    }

    static toInputTime ( d: Date ): string {
        let hours: string = this.formatInt( d.getHours() );
        let minutes: string = this.formatInt( d.getMinutes() );

        return hours + ':' + minutes;
    }

    static formatInt( v: number ): string {
        let s: string = v.toString(10); 
        if ( v < 10 ) {
            s = '0' + s;
        }

        return s;
    }
}