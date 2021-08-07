import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

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
    private router: Router,
    private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
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
