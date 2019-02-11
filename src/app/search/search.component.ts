import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubService } from '../shared/services/github.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  p = 1;
  total: number;
  loading = false;
  showData = false;
  searchForm: FormGroup;
  users;
  hideSearchBar = false;

  constructor(private fb: FormBuilder, private githubService: GithubService) {}

  ngOnInit() {
    this.buildSearchForm();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  searchUser(page: number) {
    this.loading = true;
    const user = this.searchForm.get('user').value;
    this.githubService.searchUsers(user, page).subscribe(res => {
      this.total = res.total_count;
      this.p = page;
      this.users = res.items;
      this.showData = true;
      this.loading = false;
    });
  }

  getPage($event) {
    this.p = $event;
    this.searchUser($event);
  }

  hideBar($event) {
    this.hideSearchBar = $event;
  }
}
