import { Component, Input, Output, EventEmitter } from "@angular/core";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

// Models
import { CalendarModel } from "./calendar.model";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent {
  @Input() calendarModel: CalendarModel;
  @Output() selectedDates = new EventEmitter<any>();

  showEndDate: boolean = true;
  valid: boolean = true;
  errorMessage: string;

  faCalendarAlt = faCalendarAlt;

  constructor() {}

  validateDate(event) {
    if (event && event.targetElement.name === "date") {
      this.calendarModel.date = event.value;
    }
    if (event && event.targetElement.name === "endDate") {
      this.calendarModel.endDate = event.value;
    }
    if (this.calendarModel.date === null) {
      this.valid = false;
      this.errorMessage = "Date is not a valid date";
    } else if (
      this.calendarModel.endDate === null &&
      this.showEndDate &&
      this.calendarModel.isDateRange
    ) {
      this.valid = false;
      this.errorMessage = "End date is not a valid date";
    } else {
      this.valid = true;
      this.errorMessage = "";
    }
    if (
      this.calendarModel.date &&
      this.calendarModel.endDate &&
      this.calendarModel.date.getTime() >=
        this.calendarModel.endDate.getTime() &&
      this.showEndDate
    ) {
      this.valid = false;
      this.errorMessage = "Start date is after or same as end date";
    }

    if (this.valid)
      this.selectedDates.emit({
        dateId: `${this.calendarModel.id}Date`,
        endDateId: `${this.calendarModel.id}EndDate`,
        date: this.calendarModel.date,
        endDate: this.calendarModel.endDate
      });
  }

  handleCheckbox(event) {
    this.showEndDate = !event.target.checked;
    this.validateDate(null);
  }
}
