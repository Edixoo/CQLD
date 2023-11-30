import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {

    const id = ref('');
    const name = ref('');
    const surname = ref('');
    const username = ref('');
    const email = ref('');
    const role = ref('');
    const created_at = ref('');
    const last_login = ref('');
      
    const setUser = ((newUser) => {
        id.value=newUser._id;
        name.value=newUser.name;
        surname.value=newUser.surname;
        username.value=newUser.username;
        email.value=newUser.email;
        role.value=newUser.role;
        created_at.value=newUser.created_at;
        last_login.value=newUser.last_login;
    });
  
    const changeRole = ((newRole) => {
        role.value=newRole;
    });
  
    const getUser = (() => {
        return {
            id: id.value,
            name: name.value,
            surname: surname.value,
            username: username.value,
            email: email.value,
            role: role.value,
            created_at: created_at.value,
            last_login: last_login.value
        }
    });

    const changeName = ((newName) => {
        name.value=newName;
    });
  
    const removeUser = (() => {
        id.value='';
        name.value='';
        surname.value='';
        username.value='';
        email.value='';
        role.value='';
        created_at.value='';
        last_login.value='';
      });
      
        return {
            id,
            username,
            role,
            setUser,
            changeRole,
            changeName,
            removeUser
        }
})

