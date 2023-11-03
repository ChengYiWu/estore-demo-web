interface getUsersResponse {
  items: [
    {
      id: string;
      userName: string;
      email: string;
      roles: [
        {
          name: string;
        },
      ];
    },
  ];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type { getUsersResponse };
