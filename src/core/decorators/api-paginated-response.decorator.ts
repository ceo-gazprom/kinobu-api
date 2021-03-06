import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { PageDto } from '../dtos';

/**
 * Api paginated response decorator
 *
 * @description This decorator helps generate correct documentation
 * when the entity is a generic paginationDto
 *
 * @param model - Model which is generic for pagination dto.
 * @param description
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description?: string,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
