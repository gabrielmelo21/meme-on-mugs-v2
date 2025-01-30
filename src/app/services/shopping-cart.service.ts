import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private storageKey = 'shoppingCart';

  constructor() { }

  getCart(): any[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    console.log(localStorage.getItem(this.storageKey)); 
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  removeFromCart(productName: string): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.product_name !== productName); 
  //  alert("Após passar o filtro, temos esse cart " + JSON.stringify(cart))
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
  



}
