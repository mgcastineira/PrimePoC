import { trigger, state, transition, style, animate } from '@angular/animations';

export let fade = trigger('fade', [

  state('void', style({ opacity: 0 })),

  transition(':enter, :leave', [
    animate(2000)
  ])
]);
