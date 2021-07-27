import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.componenet.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private dataStorage: DataStorageService,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
