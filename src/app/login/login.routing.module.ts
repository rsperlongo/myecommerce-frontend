import { RouterModule, Routes } from "@angular/router";
import { Login } from "./login";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: Login,

    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    providers: []
})
export class LoginRoutingModule {}
