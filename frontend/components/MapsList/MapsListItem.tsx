"use client";

import type { Map } from "@prisma/client";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function MapsListItem({
  map: { id, name, tilesPath },
}: {
  map: Map;
  children?: React.ReactNode;
}) {
  const handleEdit = (id: number) => console.log(`editing map : ${id}`);
  const handleDelete = (id: number) => console.log(`deleting map : ${id}`);

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{tilesPath}</td>
      <td>
        <Link href={`maps/${id}`}>
          <Button className="me-3">
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Link>
        <Button className="me-3" onClick={() => handleEdit(id)}>
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          variant="danger"
          className="me-3"
          onClick={() => handleDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
}
