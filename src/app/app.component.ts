import { Component, OnInit, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { MaterialModule } from './materials/materials.module'
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coral_connect_frontend';

  config: any;

  volume: number = 100

  constructor(
    private renderer: Renderer2,
    private authService: AuthService
    )
    {
      this.authService.autoLogin();
    }
// authservice
  ngOnInit() {
  }



}
