interface ListWrapperProps {
  children: React.ReactNode;
}

// in the list-form component, we want to be able to have crud funcs to the list data.
// the list-form is a client component, and we wanna use server actions on the form,
// in order to do it we need to be able to tell nextjs to allow a usage of server component (aka the execute function we bound to onClick event)
// the way we can use server component inside client component is to use a wrapper with children props
// so in list-form, we will wrap everything in this wrapper and then children which need the server well be able to as well as children that are not
export const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className="shrink-0 h-full w-[272px] select-none">{children}</li>;
};
