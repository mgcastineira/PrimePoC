import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-rolloff',
  templateUrl: './rolloff.component.html',
  styleUrls: ['./rolloff.component.scss'],
  animations: [
    trigger('slideup', [
      state('void', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.3s ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class RolloffComponent implements OnInit {
  currentStep: number = 1;
  filedownloaded = false;
  selectedValue: string;
  lastDate: Date = null;

  es: any = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Borrar'
  };

  constructor() { }

  ngOnInit() {
  }
  nextStep() {
    this.currentStep++;
  }

  setStep(value: number) {
    this.currentStep = value;
  }

  downloaded() {
    this.filedownloaded = true;
  }
}
