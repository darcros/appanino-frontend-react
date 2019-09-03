import gql from 'graphql-tag';
import * as ReactApollo from 'react-apollo';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql/client/context.interface';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type JwtSchool = {
  __typename?: 'JwtSchool';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type JwtUserInfo = {
  __typename?: 'JwtUserInfo';
  id: Scalars['Int'];
  role: Role;
  school: JwtSchool;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Returns a jwt to use for authentication */
  login: Scalars['String'];
  /** creates a new user */
  register: User;
  /** Update data on the current user */
  updateSelf: User;
  /** Update the password of the current user */
  updatePassword: User;
  /** Creates a new product */
  addProduct: Product;
  /** Deletes a products given its ID */
  deleteProduct: Scalars['Boolean'];
  saveToken: Maybe<Scalars['Boolean']>;
  logOut: Maybe<Scalars['Boolean']>;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  userRegistrationData: UserRegistrationDataInput;
};

export type MutationUpdateSelfArgs = {
  updateData: UserUpdateInput;
};

export type MutationUpdatePasswordArgs = {
  updateData: PasswordUpdateInput;
};

export type MutationAddProductArgs = {
  newProductData: NewProductDataInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};

export type MutationSaveTokenArgs = {
  token: Scalars['String'];
};

export type NewProductDataInput = {
  name: Scalars['String'];
  price: Scalars['Float'];
  schoolIds: Array<Scalars['ID']>;
  categoryId: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  totalPrice: Scalars['Float'];
  user: User;
};

export type PasswordUpdateInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  schools: Array<School>;
  category: Category;
};

export type Query = {
  __typename?: 'Query';
  self: User;
  categories: Array<Category>;
  orders: Array<Order>;
  /** Returns a list of products */
  products: Array<Product>;
  /** Returns a product given its ID */
  product: Maybe<Product>;
  schools: Array<School>;
  users: Array<User>;
  isLoggedIn: Scalars['Boolean'];
  userInfo: Maybe<JwtUserInfo>;
};

export type QueryProductsArgs = {
  getAll?: Maybe<Scalars['Boolean']>;
};

export type QueryProductArgs = {
  id: Scalars['Float'];
};

export enum Role {
  User = 'User',
  SchoolAdmin = 'SchoolAdmin',
  Admin = 'Admin',
}

export type School = {
  __typename?: 'School';
  id: Scalars['ID'];
  name: Scalars['String'];
  users: Array<User>;
  products: Array<Product>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  role: Role;
  school: School;
  orders: Array<Order>;
};

export type UserRegistrationDataInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  schoolId: Scalars['ID'];
};

export type UserUpdateInput = {
  firstname: Maybe<Scalars['String']>;
  lastname: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  schoolId: Maybe<Scalars['ID']>;
};
export type DoLoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DoLoginMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'login'>;

export type DoSaveTokenMutationVariables = {
  token: Scalars['String'];
};

export type DoSaveTokenMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'saveToken'>;

export type DoPasswordUpdateMutationVariables = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type DoPasswordUpdateMutation = { __typename?: 'Mutation' } & {
  updatePassword: { __typename?: 'User' } & Pick<User, 'id'>;
};

export type IsLoggedInQueryVariables = {};

export type IsLoggedInQuery = { __typename?: 'Query' } & Pick<Query, 'isLoggedIn'>;

export type GetUserRoleQueryVariables = {};

export type GetUserRoleQuery = { __typename?: 'Query' } & {
  userInfo: Maybe<{ __typename?: 'JwtUserInfo' } & Pick<JwtUserInfo, 'role'>>;
};

export type GetShopProductsQueryVariables = {};

export type GetShopProductsQuery = { __typename?: 'Query' } & {
  self: { __typename?: 'User' } & Pick<User, 'id'> & {
      school: { __typename?: 'School' } & Pick<School, 'id'> & {
          products: Array<
            { __typename?: 'Product' } & Pick<Product, 'id' | 'name' | 'price'> & {
                category: { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>;
              }
          >;
        };
    };
};

export type UserSettingsPageQueryQueryVariables = {};

export type UserSettingsPageQueryQuery = { __typename?: 'Query' } & {
  self: { __typename?: 'User' } & Pick<User, 'id' | 'firstname' | 'lastname' | 'email'> & {
      school: { __typename?: 'School' } & Pick<School, 'id' | 'name'>;
    };
  schools: Array<{ __typename?: 'School' } & Pick<School, 'id' | 'name'>>;
};

export const DoLoginDocument = gql`
  mutation DoLogin($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export type DoLoginMutationFn = ReactApollo.MutationFn<DoLoginMutation, DoLoginMutationVariables>;
export type DoLoginComponentProps = Omit<
  ReactApollo.MutationProps<DoLoginMutation, DoLoginMutationVariables>,
  'mutation'
>;

export const DoLoginComponent = (props: DoLoginComponentProps) => (
  <ReactApollo.Mutation<DoLoginMutation, DoLoginMutationVariables> mutation={DoLoginDocument} {...props} />
);

export function useDoLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoLoginMutation, DoLoginMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoLoginMutation, DoLoginMutationVariables>(DoLoginDocument, baseOptions);
}
export type DoLoginMutationHookResult = ReturnType<typeof useDoLoginMutation>;
export const DoSaveTokenDocument = gql`
  mutation DoSaveToken($token: String!) {
    saveToken(token: $token) @client
  }
`;
export type DoSaveTokenMutationFn = ReactApollo.MutationFn<DoSaveTokenMutation, DoSaveTokenMutationVariables>;
export type DoSaveTokenComponentProps = Omit<
  ReactApollo.MutationProps<DoSaveTokenMutation, DoSaveTokenMutationVariables>,
  'mutation'
>;

export const DoSaveTokenComponent = (props: DoSaveTokenComponentProps) => (
  <ReactApollo.Mutation<DoSaveTokenMutation, DoSaveTokenMutationVariables> mutation={DoSaveTokenDocument} {...props} />
);

export function useDoSaveTokenMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoSaveTokenMutation, DoSaveTokenMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoSaveTokenMutation, DoSaveTokenMutationVariables>(
    DoSaveTokenDocument,
    baseOptions,
  );
}
export type DoSaveTokenMutationHookResult = ReturnType<typeof useDoSaveTokenMutation>;
export const DoPasswordUpdateDocument = gql`
  mutation DoPasswordUpdate($oldPassword: String!, $newPassword: String!) {
    updatePassword(updateData: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      id
    }
  }
`;
export type DoPasswordUpdateMutationFn = ReactApollo.MutationFn<
  DoPasswordUpdateMutation,
  DoPasswordUpdateMutationVariables
>;
export type DoPasswordUpdateComponentProps = Omit<
  ReactApollo.MutationProps<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>,
  'mutation'
>;

export const DoPasswordUpdateComponent = (props: DoPasswordUpdateComponentProps) => (
  <ReactApollo.Mutation<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>
    mutation={DoPasswordUpdateDocument}
    {...props}
  />
);

export function useDoPasswordUpdateMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>,
) {
  return ReactApolloHooks.useMutation<DoPasswordUpdateMutation, DoPasswordUpdateMutationVariables>(
    DoPasswordUpdateDocument,
    baseOptions,
  );
}
export type DoPasswordUpdateMutationHookResult = ReturnType<typeof useDoPasswordUpdateMutation>;
export const IsLoggedInDocument = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
export type IsLoggedInComponentProps = Omit<ReactApollo.QueryProps<IsLoggedInQuery, IsLoggedInQueryVariables>, 'query'>;

export const IsLoggedInComponent = (props: IsLoggedInComponentProps) => (
  <ReactApollo.Query<IsLoggedInQuery, IsLoggedInQueryVariables> query={IsLoggedInDocument} {...props} />
);

export function useIsLoggedInQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<IsLoggedInQueryVariables>) {
  return ReactApolloHooks.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(IsLoggedInDocument, baseOptions);
}
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>;
export const GetUserRoleDocument = gql`
  query GetUserRole {
    userInfo @client {
      role
    }
  }
`;
export type GetUserRoleComponentProps = Omit<
  ReactApollo.QueryProps<GetUserRoleQuery, GetUserRoleQueryVariables>,
  'query'
>;

export const GetUserRoleComponent = (props: GetUserRoleComponentProps) => (
  <ReactApollo.Query<GetUserRoleQuery, GetUserRoleQueryVariables> query={GetUserRoleDocument} {...props} />
);

export function useGetUserRoleQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<GetUserRoleQueryVariables>) {
  return ReactApolloHooks.useQuery<GetUserRoleQuery, GetUserRoleQueryVariables>(GetUserRoleDocument, baseOptions);
}
export type GetUserRoleQueryHookResult = ReturnType<typeof useGetUserRoleQuery>;
export const GetShopProductsDocument = gql`
  query GetShopProducts {
    self {
      id
      school {
        id
        products {
          id
          name
          price
          category {
            id
            name
          }
        }
      }
    }
  }
`;
export type GetShopProductsComponentProps = Omit<
  ReactApollo.QueryProps<GetShopProductsQuery, GetShopProductsQueryVariables>,
  'query'
>;

export const GetShopProductsComponent = (props: GetShopProductsComponentProps) => (
  <ReactApollo.Query<GetShopProductsQuery, GetShopProductsQueryVariables> query={GetShopProductsDocument} {...props} />
);

export function useGetShopProductsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetShopProductsQueryVariables>,
) {
  return ReactApolloHooks.useQuery<GetShopProductsQuery, GetShopProductsQueryVariables>(
    GetShopProductsDocument,
    baseOptions,
  );
}
export type GetShopProductsQueryHookResult = ReturnType<typeof useGetShopProductsQuery>;
export const UserSettingsPageQueryDocument = gql`
  query userSettingsPageQuery {
    self {
      id
      firstname
      lastname
      email
      school {
        id
        name
      }
    }
    schools {
      id
      name
    }
  }
`;
export type UserSettingsPageQueryComponentProps = Omit<
  ReactApollo.QueryProps<UserSettingsPageQueryQuery, UserSettingsPageQueryQueryVariables>,
  'query'
>;

export const UserSettingsPageQueryComponent = (props: UserSettingsPageQueryComponentProps) => (
  <ReactApollo.Query<UserSettingsPageQueryQuery, UserSettingsPageQueryQueryVariables>
    query={UserSettingsPageQueryDocument}
    {...props}
  />
);

export function useUserSettingsPageQueryQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UserSettingsPageQueryQueryVariables>,
) {
  return ReactApolloHooks.useQuery<UserSettingsPageQueryQuery, UserSettingsPageQueryQueryVariables>(
    UserSettingsPageQueryDocument,
    baseOptions,
  );
}
export type UserSettingsPageQueryQueryHookResult = ReturnType<typeof useUserSettingsPageQueryQuery>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Role: Role;
  School: ResolverTypeWrapper<School>;
  Product: ResolverTypeWrapper<Product>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Category: ResolverTypeWrapper<Category>;
  Order: ResolverTypeWrapper<Order>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  JwtUserInfo: ResolverTypeWrapper<JwtUserInfo>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JwtSchool: ResolverTypeWrapper<JwtSchool>;
  Mutation: ResolverTypeWrapper<{}>;
  UserRegistrationDataInput: UserRegistrationDataInput;
  UserUpdateInput: UserUpdateInput;
  PasswordUpdateInput: PasswordUpdateInput;
  NewProductDataInput: NewProductDataInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Role: Role;
  School: School;
  Product: Product;
  Float: Scalars['Float'];
  Category: Category;
  Order: Order;
  Boolean: Scalars['Boolean'];
  JwtUserInfo: JwtUserInfo;
  Int: Scalars['Int'];
  JwtSchool: JwtSchool;
  Mutation: {};
  UserRegistrationDataInput: UserRegistrationDataInput;
  UserUpdateInput: UserUpdateInput;
  PasswordUpdateInput: PasswordUpdateInput;
  NewProductDataInput: NewProductDataInput;
};

export type CategoryResolvers<ContextType = Context, ParentType = ResolversParentTypes['Category']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type JwtSchoolResolvers<ContextType = Context, ParentType = ResolversParentTypes['JwtSchool']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type JwtUserInfoResolvers<ContextType = Context, ParentType = ResolversParentTypes['JwtUserInfo']> = {
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  school: Resolver<ResolversTypes['JwtSchool'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType = ResolversParentTypes['Mutation']> = {
  login: Resolver<ResolversTypes['String'], ParentType, ContextType, MutationLoginArgs>;
  register: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationRegisterArgs>;
  updateSelf: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdateSelfArgs>;
  updatePassword: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdatePasswordArgs>;
  addProduct: Resolver<ResolversTypes['Product'], ParentType, ContextType, MutationAddProductArgs>;
  deleteProduct: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, MutationDeleteProductArgs>;
  saveToken: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationSaveTokenArgs>;
  logOut: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type OrderResolvers<ContextType = Context, ParentType = ResolversParentTypes['Order']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalPrice: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = Context, ParentType = ResolversParentTypes['Product']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  schools: Resolver<Array<ResolversTypes['School']>, ParentType, ContextType>;
  category: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType = ResolversParentTypes['Query']> = {
  self: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  categories: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  orders: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  products: Resolver<
    Array<ResolversTypes['Product']>,
    ParentType,
    ContextType,
    RequireFields<QueryProductsArgs, 'getAll'>
  >;
  product: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, QueryProductArgs>;
  schools: Resolver<Array<ResolversTypes['School']>, ParentType, ContextType>;
  users: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  isLoggedIn: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userInfo: Resolver<Maybe<ResolversTypes['JwtUserInfo']>, ParentType, ContextType>;
};

export type SchoolResolvers<ContextType = Context, ParentType = ResolversParentTypes['School']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  products: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType = ResolversParentTypes['User']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  school: Resolver<ResolversTypes['School'], ParentType, ContextType>;
  orders: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Category: CategoryResolvers<ContextType>;
  JwtSchool: JwtSchoolResolvers<ContextType>;
  JwtUserInfo: JwtUserInfoResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Order: OrderResolvers<ContextType>;
  Product: ProductResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  School: SchoolResolvers<ContextType>;
  User: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
