import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    public userService: UserService,
    private modalService: NgbModal
  ) {}

  users: User[];
  user: User;
  newUser: User;
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(id: Number): void {
    this.userService.delete(id).subscribe((data) => {
      this.getUsers();
    });
  }

  updateUser() {
    this.userService.update(this.user).subscribe(
      (response) => {
        this.users = this.users.map((user) => {
          if (user.id == this.user.id) {
            return response as User;
          }
          return user;
        });
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe(
      (response) => {
        this.users.push(response as User);
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  open(content, user: User) {
    if (user) {
      this.user = JSON.parse(JSON.stringify(user));
    } else {
      this.newUser = {} as User;
    }
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'sm-modal',
      })
      .result.then((result) => {})
      .catch((error) => console.error(error));
  }
}
