import { NextPage } from 'next';
export default function Forms() {
  return (
    <form className="flex flex-col space-y-2 p-5 ">
      <input
        type="text"
        required
        placeholder="Username"
        className="border peer p-1 border-gray-400 rounded-md"
      />
      <span className="hidden peer-invalid:block  peer-invalid:text-red-500">
        This is invalid
      </span>
      <span className="hidden peer-valid:block  peer-valid:text-teal-500">
        Awesome User!
      </span>
      <input type="submit" value="Login" className="bg-white" />
    </form>
  );
}
