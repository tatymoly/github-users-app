import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { GithubService } from '../../shared/services/github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  @Input() total;
  @Input() users;
  @Output() page = new EventEmitter();
  @Output() hideSearchBar = new EventEmitter<Boolean>();

  showDetails = false;
  userDetails;
  p;

  private unsub: Subject<any> = new Subject();

  constructor(private githubService: GithubService) {}

  sendPage($event) {
    this.p = $event;
    this.page.emit($event);
  }

  requestUserDetails(user) {
    this.githubService
      .searchUserDetails(user)
      .pipe(takeUntil(this.unsub))
      .subscribe(res => {
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
  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
