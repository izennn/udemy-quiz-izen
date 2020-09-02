from rest_framework import pagination
from rest_framework.response import Response

class PaginationWithPageNumber(pagination.PageNumberPagination):
	page_size = 1
	
	def get_paginated_response(self, data):
		return Response({
			'count': self.page.paginator.count,
			'page_number': self.page.number,
			'links': {
				'next': self.get_next_link(),
				'prev': self.get_previous_link()
			},
			'results': data,
		})
