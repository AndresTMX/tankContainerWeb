import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { GridItemElement } from "../GridItemElement";

function GridItemColumn({ stateLayout, column, level, tipos }) {

    const filterColumn = stateLayout.filter((element) => element.columna === column && element.nivel === level )

    return (
        <Grid item xs={2}>
            <Grid container direction='column' spacing={1}>
                {filterColumn.map((item, index) => (
                    <GridItemElement key={index} sizeItem={1} item={item} tipos={tipos} />
                ))}
            </Grid>
        </Grid>

    );
}

export { GridItemColumn };