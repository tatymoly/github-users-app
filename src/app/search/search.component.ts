import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubService } from '../shared/services/github.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  p = 1;
  total: number;
  loading = false;
  showData = false;
  hideSearchBar = false;
  showError = false;
  searchForm: FormGroup;
  users;

  private unsub: Subject<any> = new Subject();

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
    this.githubService
      .searchUsers(user, page)
      .pipe(takeUntil(this.unsub))
      .subscribe(res => {
        this.total = res.total_count;
        if (this.total === 0) {
          this.showError = true;
        } else {
          this.showError = false;
        }
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

  clearSearch() {
    this.searchForm.reset();
    this.showError = false;
    this.users = [];
    this.showData = false;
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
