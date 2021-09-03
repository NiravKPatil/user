import { AdminComponent } from './admin.component';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Role } from '../models';
import { UserService } from '../services';
import { Observable, of, pipe } from 'rxjs';

const users = [
  {
    id: 1,
    username: 'admin@admin.com',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: Role.Admin
  },
  {
    id: 2,
    username: 'user@admin.com',
    password: 'user',
    firstName: 'Normal',
    lastName: 'User',
    role: Role.User
  }
];

describe('AdminComponent', () => {
  let component: AdminComponent;
  let userServiceMock;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: UserService,
            useValue: {
              getAll: jest.fn()
            }
          }
        ]
      });
      userServiceMock = TestBed.inject(UserService);
      component = new AdminComponent(userServiceMock);
    })
  );

  it(`Should component defined`, () => {
    expect(component).toBeDefined();
  });

  it(`should call 'ngOnInint' when User Login`, done => {
    jest.spyOn(component['userService'], 'getAll').mockReturnValue(of(users));
    component.ngOnInit();
    component['userService'].getAll().subscribe(() => {
      expect(component.users).toBeDefined();
      expect(component.users).toEqual(users);
      expect(component.users.length).toEqual(2);
      done();
    });
  });
});
