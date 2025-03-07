import React, { use } from "react";
import type { Map } from "@prisma/client";
import { Table } from "react-bootstrap";
import MapsListItem from "./MapsListItem";

export default function MapsList({ maps }: { maps: Map[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image path</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {maps.map((map) => {
          return <MapsListItem key={map.id} map={map} />;
        })}
      </tbody>
    </Table>
  );
}
