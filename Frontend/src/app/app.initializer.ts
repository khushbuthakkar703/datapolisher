import { UserService } from "./authenticate/services/user/user.service";


export function appInitializer(authenticationService: UserService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}