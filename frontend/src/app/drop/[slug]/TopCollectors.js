import React from "react";
import Link from "next/link";
import { Table, Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import { selectDropCollectors } from "@/store/drop/selectors";

function TopCollectors() {
  const collectors = useSelector(selectDropCollectors);

  if (!collectors?.length) return null;

  return (
    <div className="border-t border-gray pt-10 mt-10">
      <h3 className="antialiased font-semibold mb-4">Top Collectors</h3>

      <Table>
        <Table.Head>
          <Table.HeadCell width={56}></Table.HeadCell>
          <Table.HeadCell>User</Table.HeadCell>
          <Table.HeadCell className="text-center" width={120}>
            Tokens
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {collectors.map((collector) => (
            <Table.Row
              key={collector.username}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="px-0 py-0 text-center" width={56}>
                <Avatar
                  className="ml-1"
                  alt="User settings"
                  img={collector.image}
                  placeholderInitials={
                    !collector.image
                      ? collector.username?.slice(0, 2).toUpperCase()
                      : null
                  }
                  rounded
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                <Link
                  className="font-medium"
                  href={`/user/${collector.username}`}
                >
                  @{collector.username}
                </Link>
              </Table.Cell>
              <Table.Cell
                className="text-center font-mono font-medium"
                width={120}
              >
                {collector.tokens}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default TopCollectors;
