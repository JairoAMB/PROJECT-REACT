import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
// servicios
import { FlatService } from "../../services/flat/flat";
import { UserService } from "../../services/user/user";
import { LocalStorageService } from "../../services/localStorage/localStorage";

export const FlatTable = ({ userLoggedId }) => {
  let typeTable = "home";
  if (userLoggedId) {
    typeTable = "favorites";
  }

  const navigate = useNavigate();
  const [flats, setFlats] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //filtros
  const [filters, setFilters] = useState({
    city: null,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
  });
  // ordenamiento
  const [sortField, setSortField] = useState("city");
  const [sortOrder, setSortOrder] = useState("asc");

  // instancia del servicio flat
  const flatService = new FlatService();
  const userService = new UserService();
  const localstorageService = new LocalStorageService();
  // variable para obtener al usuario loggeado
  const userLogged = localstorageService.getLoggedUser();

  // funcion para obetener los flats de firebase
  const getFlats = async () => {
    setLoading(true);
    const response = await flatService.getFlats(filters, sortField, sortOrder);
    setFlats(response.data);
    setLoading(false);
    console.log(response.data);
  };

  // funcion para obtener a todos los usuarios
  const getUsers = async () => {
    const response = await userService.getUsers();
    setUsers(response.data);
  };

  const getFavoriteFlats = async () => {
    setLoading(true);
    const response = await flatService.getFavoriteFlats(userLogged.id);
    const favoriteFlats = response.data.map((flat) => flat.data);
    console.log(favoriteFlats);
    setFlats(favoriteFlats);
    setLoading(false);
  };

  useEffect(() => {
    if (typeTable === "home") {
      getFlats();
      console.log(typeTable);
    } else if (typeTable === "favorites") {
      getFavoriteFlats();
      console.log(typeTable);
    }
  }, [filters, sortField, sortOrder]);

  useEffect(() => {
    getUsers();
  });

  const onSort = (event) => {
    // console.log(event);
    setSortField(event.sortField);
    setSortOrder(event.sortOrder === 1 ? "asc" : "desc");
  };

  const cityFilterTemplate = () => {
    return (
      <InputText
        placeholder={"City"}
        className="w-[125px]"
        value={filters.city}
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
      />
    );
  };

  const areaFilterTemplate = () => {
    return (
      <>
        <div className="w-full flex flex-row justify-center gap-1">
          <InputNumber
            placeholder="Min Area"
            className="w-[100px]"
            value={filters.minArea}
            onChange={(e) => setFilters({ ...filters, minArea: e.value })}
          />
          <InputNumber
            placeholder="Max Area"
            className="w-[100px]"
            value={filters.maxArea}
            onChange={(e) => setFilters({ ...filters, maxArea: e.value })}
          />
        </div>
      </>
    );
  };

  const priceFilterTemplate = () => {
    return (
      <>
        <div className="flex flex-row gap-1">
          <InputNumber
            placeholder="Min Price"
            className="w-[100px]"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.value })}
          />
          <InputNumber
            placeholder="Max Price"
            className="w-[100px]"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.value })}
          />
        </div>
      </>
    );
  };

  const initFilters = () => {
    setFilters({
      city: null,
      minPrice: null,
      maxPrice: null,
      minArea: null,
      maxArea: null,
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
      </div>
    );
  };
  const header = renderHeader();

  const StreetNameBodyTemplate = (rowData) => {
    return <span> {`${rowData.streetName} - ${rowData.streetNumber}`} </span>;
  };

  const acBodyTemplate = (rowData) => {
    return rowData.ac ? <span> Yes </span> : <span> No </span>;
  };

  const yearBuitBodyTemplate = (rowData) => {
    if (!rowData.yearBuilt) return "Fecha no disponible";

    if (typeof rowData.yearBuilt === "object") {
      const date = new Date(rowData.yearBuilt.seconds * 1000);
      const newDate = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
      }).format(date);
      return <span> {newDate} </span>;
    }
  };

  const dateAvailableBodyTemplate = (rowData) => {
    if (!rowData.dateAvailable) return "Fecha no disponible";

    if (typeof rowData.dateAvailable === "object") {
      const date = new Date(rowData.dateAvailable.seconds * 1000);
      const newDate = new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
      return <span> {newDate} </span>;
    }
  };

  const ownerBodyTemplate = (rowData) => {
    const user = users.find((element) => element.id === rowData.createdBy);

    if (!user) {
      return "No user";
    } else {
      const content = (
        <>
          <Avatar
            label={user.firstName[0]?.toUpperCase()}
            className="mr-2"
            style={{ backgroundColor: "#114B5F", color: "#F7F6F5" }}
            shape="circle"
          />
          <span className="ml-2 font-normal">{`${user.firstName} ${user.lastName}`}</span>
        </>
      );
      return (
        <div className="card">
          <Chip className="pl-0 pr-3" template={content} />
        </div>
      );
    }
  };

  const toggleFavoriteFlat = async (rowData, isFavorite, setIsFavorite) => {
    const favoriteFlat = {
      createdBy: rowData.createdBy,
      flatId: rowData.id,
      userLoggedId: userLogged.id,
    };

    if (!isFavorite) {
      const result = await flatService.addFavoriteFlat(favoriteFlat);
      setIsFavorite(true);
    } else {
      const result = await flatService.removeFavoriteFlat(favoriteFlat);
      setIsFavorite(false);
      // Si estamos en la vista "favorites", eliminamos el piso del estado
      if (typeTable === "favorites") {
        setFlats((prevFlats) => prevFlats.filter((flat) => flat.id !== rowData.id));
      }
    }
  };

  const checkFavorite = async (favoritetFlat, setIsFavorite) => {
    const result = await flatService.checkFavoriteFlat(favoritetFlat);
    if (result.data !== null) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const favoriteBodyTemplate = (rowData) => {
    const [isFavorite, setIsFavorite] = useState(null);

    const isfavoritetFlat = {
      flatId: rowData.id,
      userLogged: userLogged.id,
    };
    checkFavorite(isfavoritetFlat, setIsFavorite);

    return (
      <Button
        icon="pi pi-heart-fill"
        size="large"
        rounded
        text
        className={
          isFavorite
            ? "text-text-primary-color border bg-bg_color_hoover"
            : "text-white bg-bg_color_hoover"
        }
        onClick={() => toggleFavoriteFlat(rowData, isFavorite, setIsFavorite)}
      />
    );
  };

  const viewFlat = (id) => {
    navigate(`/view-flat/${id}`);
  };

  const viewBodyTemplate = (rowData) => {
    return (
      <Button
        onClick={() => viewFlat(rowData.id)}
        type="button"
        icon="pi pi-eye"
        rounded
        className="bg-info_color"
      ></Button>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[98%]">
          <DataTable
            size="small"
            scrollable
            tableStyle={{ minWidth: "50rem" }}
            dataKey="id"
            value={flats}
            stripedRows
            showGridlines
            loading={loading}
            paginator
            rows={10}
            {...(typeTable === "home" && {
              filterDisplay: "row",
              header: header,
              onSort: onSort,
              sortField: sortField,
              sortOrder: sortOrder,
            })}
            emptyMessage="No flats found."
          >
            <Column
              field="city"
              header="City"
              style={{ width: "15%" }}
              filterField="city"
              filter
              filterElement={cityFilterTemplate}
              showFilterMenu={false}
              sortable
            ></Column>
            <Column
              header="Street Name & Number"
              style={{ width: "25%" }}
              body={StreetNameBodyTemplate}
            ></Column>
            <Column
              field="area"
              header="Area Size (m2)"
              style={{ width: "15%" }}
              filterField="area"
              filter
              filterElement={areaFilterTemplate}
              showFilterMenu={false}
              sortable
            ></Column>
            <Column
              header="AC"
              body={acBodyTemplate}
              style={{ width: "10%" }}
            ></Column>
            <Column
              header="Year Built"
              body={yearBuitBodyTemplate}
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="rentPrice"
              header="Rent Price ($)"
              style={{ width: "25%" }}
              filterField="rentPrice"
              filter
              filterElement={priceFilterTemplate}
              showFilterMenu={false}
              sortable
            ></Column>
            <Column
              header="Date Available"
              body={dateAvailableBodyTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              header="Owner"
              body={ownerBodyTemplate}
              style={{ width: "45%" }}
            ></Column>
            <Column
              header="Favorite"
              body={favoriteBodyTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              header="View"
              body={viewBodyTemplate}
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};
