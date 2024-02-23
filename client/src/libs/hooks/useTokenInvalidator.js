import { useQueryClient } from "@tanstack/react-query";

export default function () {
  const qclient = useQueryClient();
  return async function () {
    await qclient.invalidateQueries("validateToken");
  };
}

/* login/logout/register must invalidate cached response to reload page with new context */
