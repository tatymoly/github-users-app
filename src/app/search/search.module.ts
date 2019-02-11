import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { SearchRoutingModule } from './search-routing.module';
import { GithubService } from '../shared/services/github.service';
import { MaterialModule } from '../../material-module';

import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    SearchComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  providers: [GithubService],
  exports: [SearchComponent],
})
export class SearchModule {}
