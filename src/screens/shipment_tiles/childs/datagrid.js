import React from "react";
import { TablePagination, Grid, Typography } from '@mui/material';
import { ROWSPERPAGE } from "config";

import { GridContainer, CardItem } from "components";

const Component = (props) => {

    const { rowsCount, rows, pageInfo, onActionClicked, onPageClicked, footerItems } = props;

    const handleChangePage = (event, newPage) => {
        const _page = { page: newPage, pageSize: pageInfo.pageSize };
        if (onPageClicked) onPageClicked(_page);
    };

    const handleChangeRowsPerPage = (event) => {
        const _page = { page: 0, pageSize: parseInt(event.target.value) };
        if (onPageClicked) onPageClicked(_page);
    };

    const OnActionClicked = (id, type) => {
        if (onActionClicked) onActionClicked(id, type);
    };

    return (
        <>
            <GridContainer>
                {rows && rows.map((x, index) => (
                    <React.Fragment key={`${x.ShipmentId}_${index}`} >
                        <CardItem keyid={x.ShipmentId} row={x} title={x.TrackingNumber}  imgsrc={x.ShipmentCarrierData}  width={300}
                            footerItems={[]} description={x.Status} onActionClicked={OnActionClicked}>
                        <Grid container direction="column">
                            <Typography variant="caption" color="text.secondary">
                                <strong>ShipmentDate:</strong>&nbsp;{x.ShipmentDate ? x.ShipmentDate : "NA"}
                            </Typography>
                        </Grid>
                                                                                                                                                                                                                                                        </CardItem>
                    </React.Fragment>
                ))}
            </GridContainer>
            {rows && rows.length > 0 && <TablePagination
                component="div"
                count={rowsCount}
                page={pageInfo.page}
                rowsPerPageOptions={ROWSPERPAGE}
                onPageChange={handleChangePage}
                rowsPerPage={pageInfo.pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </>
    );

};

export default Component;
