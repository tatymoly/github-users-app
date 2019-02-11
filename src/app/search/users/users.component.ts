import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GithubService } from '../../shared/services/github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() total;
  @Input() users;
  @Output() page = new EventEmitter();
  @Output() hideSearchBar = new EventEmitter<Boolean>();

  showDetails = false;
  userDetails;
  p;
  constructor(private githubService: GithubService) {}

  sendPage($event) {
    this.p = $event;
    this.page.emit($event);
  }

  requestUserDetails(user) {
    this.githubService.searchUserDetails(user).subscribe(res => {
      this.userDetails = res;
      this.showDetails = true;
    });
  }

  showResults() {
    this.showDetails = false;
  }

  hideSearch(search: boolean) {
    this.hideSearchBar.emit(search);
  }
}
