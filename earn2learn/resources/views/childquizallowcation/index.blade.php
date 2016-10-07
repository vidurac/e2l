@extends('layouts.master')

@section('content')

    <h1>Childquizallocations <a href="{{ route('childquizallocation.create') }}" class="btn btn-primary pull-right btn-sm">Add New Childquizallocation</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Child Id</th><th>Quiz Id</th><th>Enable</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($childquizallocations as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('/childquizallocation', $item->id) }}">{{ $item->child_id }}</a></td><td>{{ $item->quiz_id }}</td><td>{{ $item->enable }}</td>
                    <td>
                        <a href="{{ route('childquizallocation.edit', $item->id) }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'route' => ['childquizallocation.destroy', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $childquizallocations->render() !!} </div>
    </div>

@endsection
