import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription;
    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    constructor(private dataStorageRecipes: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user; // -> !user ? false : true;
      });
    }

    onSaveData() {
      this.dataStorageRecipes.storeRecipes();
    }

    onFetchData() {
      this.dataStorageRecipes.fetchRecipes().subscribe();
    }

    onLogout() {
      this.authService.logout();
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }
}
