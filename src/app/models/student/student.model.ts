export class Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  groupId: string;
  groupName: string;
  groupChatRoomId: string;


  constructor(id: string, firstName: string, lastName: string, email: string, roles: string[], groupId: string, groupName: string, groupChatRoomId: string) {
    this.id = id
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roles = roles;
    this.groupId = groupId;
    this.groupName = groupName;
    this.groupChatRoomId = groupChatRoomId;
  }
}
