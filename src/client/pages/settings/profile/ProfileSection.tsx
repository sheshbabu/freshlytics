import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Button } from "semantic-ui-react";
import useRequest from "../../../components/useRequest";
import UserModal from "../users/UserModal";
import { User } from "../../../types/User.type";

export default function ProfileSection() {
  const [user, isLoading, refetch] = useRequest<User>(`/api/users/${3}`);
  const [modalUserId, setModalUserId] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  if (user === null || isLoading) {
    return null;
  }

  function handleEditClick(userId: string) {
    setModalUserId(userId);
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
    refetch();
  }

  return (
    <div>
      <Header as="h5" attached="top">
        Profile
      </Header>
      <Segment attached="bottom">
        <Button onClick={() => handleEditClick(user.id)}>Edit Details</Button>
        <Link to="/password">
          <Button>Change Password</Button>
        </Link>
        <UserModal isOpen={isModalOpen} mode="edit" userId={modalUserId} onClose={handleModalClose} />
      </Segment>
    </div>
  );
}
