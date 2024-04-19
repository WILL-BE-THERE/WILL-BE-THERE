interface Account {
  type: AccountType;
}

enum AccountType {
  Guest = "Guest",
  Host = "Host",
}
